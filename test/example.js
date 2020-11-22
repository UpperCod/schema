import { schema, compose } from "../src";
import { options, min } from "../src/filter";
import { trim, fill } from "../src/transform";

const user = schema({
    d: fill(Date.now),
});

console.log(user({}));
