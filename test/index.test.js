import test from "ava";
import { schema } from "../src";

test("simple schema", async (t) => {
    const valid = schema({
        id: Number,
    });

    try {
        const resultSuccess = await valid({ id: "10" });
        t.deepEqual(resultSuccess, { id: 10 });
    } catch (e) {
        t.fail();
    }
});

test("simple reject", async (t) => {
    const valid = schema({
        id: () => {
            throw "invalid id";
        },
    });
    try {
        valid({ id: "10" });
        t.fail();
    } catch (error) {
        t.is(error.id.message, "invalid id");
    }
});

test("simple nested", async (t) => {
    const data = schema({
        id: Number,
    });
    const user = schema({
        data,
    });

    try {
        const result = await user({
            data: { id: "100" },
        });
        t.deepEqual(result, { data: { id: 100 } });
    } catch (error) {
        t.fail();
    }
});
