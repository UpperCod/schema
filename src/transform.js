import { error } from "./index";

export function date(value) {
    const d = new Date(value);
    const valid = d.getDate() == d.getDate();
    if (valid) {
        return d;
    } else {
        throw error(date)`${value}`;
    }
}
/**
 * forces a value as boolean
 * @param {*} value
 * @return {boolean}
 */
export const bool = (value) =>
    typeof value == "string" ? Boolean(value) : !!value;
/**
 * fill in the value
 * @param {*} optional
 */
export const fill = (optional) => (value) => (value ? value : optional);

/**
 * @param {string} value
 * @returns {string}
 */
export const trim = (value) => value.trim();
