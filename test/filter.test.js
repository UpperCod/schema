import test from "ava";
import { schema } from "../src";
import { filter, options, date } from "../src/filter";

test("simple filter", async (t) => {
    const valid = schema({
        id: filter((value) => value == 1),
    });

    try {
        const result = await valid({ id: 1 });
        t.deepEqual(result, { id: 1 });
    } catch (error) {
        t.fail();
    }
});

test("simple options", async (t) => {
    const valid = schema({
        id: options(1, 2, 3, 4, 5),
    });

    try {
        const result1 = await valid({ id: 1 });
        t.deepEqual(result1, { id: 1 });
        await valid({ id: 10 });
        t.fail();
    } catch (error) {
        t.deepEqual(error, { id: 10 });
    }
});

test("simple date", async (t) => {
    const valid = schema({
        date: date(),
    });

    try {
        const result = await valid({
            date: "01-01-2020",
        });
        t.deepEqual(result, { date: "01-01-2020" });
    } catch (e) {
        t.fail();
    }
});

test("simple invalid date", async (t) => {
    const valid = schema({
        date: date(),
    });

    try {
        await valid({
            date: "32-01-2020",
        });
        t.fail();
    } catch (error) {
        t.deepEqual(error, { date: "32-01-2020" });
    }
});

test("simple invalid date.min", async (t) => {
    const valid = schema({
        date: date({ min: new Date("02-01-2020") }),
    });

    try {
        const result = await valid({
            date: "01-01-2020",
        });
        t.fail();
    } catch (error) {
        t.deepEqual(error, { date: "01-01-2020" });
    }
});

test("simple invalid date.max", async (t) => {
    const valid = schema({
        date: date({ max: new Date("02-01-2020") }),
    });

    try {
        const result = await valid({
            date: "03-01-2020",
        });
        t.fail();
    } catch (error) {
        t.deepEqual(error, { date: "03-01-2020" });
    }
});
