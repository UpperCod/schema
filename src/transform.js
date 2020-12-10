import { error } from "./index";

export const transform = (callback, reference) => (value) => {
    try {
        return callback(value);
    } catch (err) {
        throw error(reference || callback)`${value}`;
    }
};

export const date = () =>
    transform((value) => {
        const d = new Date(value);
        const valid = d.getDate() == d.getDate();
        if (valid) {
            return d;
        } else {
            throw value;
        }
    }, date);
/**
 * forces a value as boolean
 * @return {(value:any)=>boolean}
 */
export const bool = () =>
    transform(
        (value) => (typeof value == "string" ? Boolean(value) : !!value),
        bool
    );
/**
 * fill in the value
 * @param {*} optional
 * @returns {(value:any)=>any}
 */
export const fill = (optional) =>
    transform((value) => (value ? value : optional()), fill);

/**
 * @returns {(value:string)=>string}
 */
export const trim = () => transform((value) => value.trim(), trim);

export const timestamp = () =>
    transform(
        (value) => (value ? date()(value).valueOf() : Date.now()),
        timestamp
    );

export const stripTags = () =>
    transform((value) => value.replace(/(<([^>]+)>)/gi, ""), stripTags);
