import test from "ava";
import { schema, compose } from "../src";
import { filter, options, date, min, max, type } from "../src/filter";

test("simple filter", (t) => {
    const valid = schema({
        id: filter((value) => value == 1),
    });

    try {
        const result = valid({ id: 1 });
        t.deepEqual(result, { id: 1 });
    } catch (error) {
        t.fail();
    }
});

test("simple options", (t) => {
    const valid = schema({
        id: options(1, 2, 3, 4, 5),
    });

    try {
        const result1 = valid({ id: 1 });
        t.deepEqual(result1, { id: 1 });
        valid({ id: 10 });
        t.fail();
    } catch (error) {
        t.is(error.id.message, "10");
    }
});

test("simple date", (t) => {
    const valid = schema({
        date: date(),
    });

    try {
        const result = valid({
            date: "01-01-2020",
        });
        t.deepEqual(result, { date: "01-01-2020" });
    } catch (e) {
        t.fail();
    }
});

test("simple invalid date", (t) => {
    const valid = schema({
        date: date(),
    });

    try {
        valid({
            date: "32-01-2020",
        });
        t.fail();
    } catch (error) {
        t.is(error.date.message, "32-01-2020");
    }
});

test("simple invalid date.min", (t) => {
    const valid = schema({
        date: date({ min: new Date("02-01-2020") }),
    });

    try {
        valid({
            date: "01-01-2020",
        });
        t.fail();
    } catch (error) {
        t.is(error.date.message, "01-01-2020");
    }
});

test("simple invalid date.max", (t) => {
    const valid = schema({
        date: date({ max: new Date("02-01-2020") }),
    });

    try {
        valid({
            date: "03-01-2020",
        });
        t.fail();
    } catch (error) {
        t.is(error.date.message, "03-01-2020");
    }
});

test("simple invalid min", (t) => {
    const valid = schema({
        name: min(3),
    });
    try {
        const result = valid({
            name: "uppercod",
        });
        t.deepEqual(result, { name: "uppercod" });
    } catch (error) {
        t.fail();
    }
    try {
        valid({
            name: "ma",
        });
        t.fail();
    } catch (error) {
        t.is(error.name.message, "ma");
    }
});

test("simple invalid max", (t) => {
    const valid = schema({
        name: max(3),
    });
    try {
        const result = valid({
            name: "ma",
        });
        t.deepEqual(result, { name: "ma" });
    } catch (error) {
        t.fail();
    }
    try {
        valid({
            name: "uppercod",
        });
        t.fail();
    } catch (error) {
        t.is(error.name.message, "uppercod");
    }
});

test("filter compose", (t) => {
    const valid = schema({
        name: compose(min(3), max(5)),
    });
    try {
        const result = valid({
            name: "upper",
        });
        t.deepEqual(result, { name: "upper" });
    } catch (error) {
        t.fail();
    }
    try {
        valid({
            name: "uppercod",
        });
        t.fail();
    } catch (error) {
        t.is(error.name.message, "uppercod");
    }
});

test("filter type", (t) => {
    const valid = schema({
        value: type(Number),
    });
    try {
        const result = valid({
            value: 10,
        });
        t.deepEqual(result, { value: 10 });
    } catch (error) {
        t.fail();
    }
    try {
        valid({
            value: "uppercod",
        });
        t.fail();
    } catch (error) {
        t.is(error.value.message, "uppercod");
    }
});
