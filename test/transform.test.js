import test from "ava";
import { schema, compose } from "../src";
import { trim, date, bool, fill } from "../src/transform";

test("transform trim", (t) => {
    const valid = schema({
        name: trim(),
    });
    try {
        const result = valid({
            name: "   uppercod   ",
        });
        t.deepEqual(result, { name: "uppercod" });
    } catch (error) {
        t.fail();
    }
});

test("transform date", (t) => {
    const valid = schema({
        name: date(),
    });
    try {
        const result = valid({
            name: "01-01-2020",
        });
        t.is(result.name.valueOf(), new Date("01-01-2020").valueOf());
    } catch (error) {
        t.fail();
    }
});

test("transform bool", (t) => {
    const valid = schema({
        name: bool(),
    });
    try {
        const result = valid({
            name: "true",
        });
        t.deepEqual(result, {
            name: true,
        });
    } catch (error) {
        t.fail();
    }
});

test("transform fill", (t) => {
    const valid = schema({
        name: fill(() => true),
    });
    try {
        const result = valid({});

        t.deepEqual(result, {
            name: true,
        });
    } catch (error) {
        t.fail();
    }
});

test("transform compose", (t) => {
    const valid = schema({
        name: compose(
            fill(() => "  uppercod  "),
            trim()
        ),
    });
    try {
        const result = valid({});
        t.deepEqual(result, {
            name: "uppercod",
        });
    } catch (error) {
        t.fail();
    }
});
