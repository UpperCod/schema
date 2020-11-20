/**
 * Allows you to safely build errors
 * @param {TemplateStringsArray} template
 * @param {any[]} values
 */
export const error = (template, ...values) =>
    template.reduce((current, part, index) => {
        const type = typeof values[index];
        const value = values[index];
        const empty = !(index in values);
        return (
            current +
            part +
            (type == "object"
                ? JSON.stringify(value)
                : type == "function"
                ? ""
                : empty
                ? ""
                : value)
        );
    }, "");

/**
 * @param  {...Filter<any>} filter
 * @return {Filter<any>}
 */
export const pipe = (...filter) => (value, ...args) =>
    filter.reduce((prev, next) => (value) =>
        next(prev(value, ...args), ...args)
    )(value);

/**
 * @template T
 * @callback Filter
 * @param {T} value
 * @return {T}
 */
