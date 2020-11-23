import { schema, compose, error } from "../src";
import { options, min, type } from "../src/filter";
import { trim, fill } from "../src/transform";

const list = (filter) => (value, prop) => {
    if (Array.isArray(value)) {
        const invalid = {};
        const valid = value.map((value, index) => {
            try {
                return filter(value, `${prop}[${index}]`);
            } catch (err) {
                invalid[index] = err;
            }
        });
        if (Object.keys(invalid).length) {
            throw error(list)`${invalid}`;
        } else {
            return valid;
        }
    }
    return [];
};

const data = schema({
    id: type(Number),
});

const user = schema({
    d: fill(Date.now),
    tags: list(data),
});

try {
    const valid = user({ tags: [2, 2, 3] });
    console.log(JSON.stringify({ valid }));
} catch (invalid) {
    console.log({ invalid });
}
