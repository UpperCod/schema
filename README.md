# @uppercod/schema

declare validations, filters or transformers in a simple and functional.

## install

```
npm install @uppercod/schema
```

## Usage

### Simple

```js
import { schema, error } from "@uppercod/schema";

const transform = schema({
    age: Number,
    email: (value) => {
        if (/\w+@\w+.\w+$/.test(value)) {
            return value;
        }
        throw "invalid email";
    },
});

transform({ age: "20" }).then(
    (valid) => console.log("valid: ", valid),
    (invalid) => console.log("invalid: ", invalid)
);
```

### multiple validations in per field

```js
const min = (minValue) => (value) =>
    minValue <= value ? error`The ${value} is less than ${minValue}` : value;

const transform = schema({
    age: [Number, min(3)],
});
```

### nested

```js
const trim = (value) => value.trim();

const user = schema({
    id: Number,
    userName: trim,
});

const data = schema({
    user: user,
});
```

### context

```js
const user = schema({
    firstName: String,
    lastName: String,
    fullName: (value, prop, { fistName, lastName }) =>
        fistName + " " + lastName,
});
```

## filters

```js
import is from "is_js";
import { schema } from "@uppercod/schema";
import { filter, date, options } from "@uppercod/schema/filter";

schema({
    email: filter(is.email),
    date: date({ min: new Date("01-02-2020") }),
    status: options("active", "inactive"),
});
```

## Api 2

```js
import { schema, optional, use } from "@uppercod/schema";

schema({
    id: (value, field, context) => {},
    firstName : minLength(3)
    fullName: () => {
        const {firstName,lastName} = use("valid");
        return firstName + " "+ lastName;
    },
});
```
