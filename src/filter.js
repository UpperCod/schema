import { error, Message } from "./index";
import { date as _date } from "./transform";
/**
 * evaluate the return of the callback as boolean, to check the validation
 * @template T
 * @param {(filter:T)=>boolean} callback
 * @param {(filter:T)=>boolean} [reference]
 * @returns {(value:T)=>T}
 */
export const filter = (callback, reference) => (value) => {
    try {
        if (callback(value)) return value;
    } catch (e) {
        value = e;
    }
    throw value instanceof Message
        ? value
        : error(reference || callback)`${value}`;
};

/**
 * limits the evaluation to only certain values
 * @param  {...any} values
 */
export const options = (...values) =>
    filter((value) => values.includes(value), options);
/**
 * validates if the date format is valid
 * @param {{min?:Date,max?:Date}} [value] - allows defining a minimum and maximum range for the date to evaluate
 */
export const date = ({ min, max } = {}) =>
    filter((value) => {
        const d = _date()(value);
        if (min || max) {
            const timestamp = d.valueOf();
            return (
                (min && min.valueOf() <= timestamp) ||
                (max && max.valueOf() >= timestamp)
            );
        }
        return true;
    }, date);

export const min = (length) =>
    filter((value) => {
        const type = typeof value;
        return (
            ((type == "string" || Array.isArray(value)) &&
                value.length >= length) ||
            (type == "number" && value >= length)
        );
    }, min);

export const max = (length) =>
    filter((value) => {
        const type = typeof value;
        return (
            ((type == "string" || Array.isArray(value)) &&
                value.length <= length) ||
            (type == "number" && value <= length)
        );
    }, max);

export const type = ({ name }) =>
    filter((value) => ({}.toString.call(value) == `[object ${name}]`), type);
