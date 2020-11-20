import { date as _date } from "./transform";
/**
 * evaluate the return of the callback as boolean, to check the validation
 * @template T
 * @param {(filter:T)=>boolean} callback
 * @returns {(value:T)=>T}
 */
export const filter = (callback) => (value) => {
    if (callback(value)) {
        return value;
    } else {
        throw value;
    }
};

/**
 * limits the evaluation to only certain values
 * @param  {...any} values
 */
export const options = (...values) => filter((value) => values.includes(value));
/**
 * validates if the date format is valid
 * @param {{min?:Date,max?:Date}} [value] - allows defining a minimum and maximum range for the date to evaluate
 */
export const date = ({ min, max } = {}) =>
    filter((value) => {
        const d = _date(value);
        if (min || max) {
            const timestamp = d.valueOf();
            return (
                (min && min.valueOf() <= timestamp) ||
                (max && max.valueOf() >= timestamp)
            );
        }
        return true;
    });
