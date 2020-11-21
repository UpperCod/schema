import test from "ava";
import { error } from "../src/utils";

test("utils error", (t) => {
    const ref = () => 10;
    const err = error(ref)`custom error`;

    t.is(err.from, ref);
    t.is(err.message, "custom error");
    // hidden
    t.value = 10;
    t.prop = "items";

    t.is(JSON.stringify({ err }), `{"err":"custom error"}`);
});
