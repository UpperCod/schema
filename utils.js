class Message extends String {
    /**
     *
     * @param {string} message
     * @param {(value:any)=>any} callback
     */
    constructor(message, callback) {
        super(message);
        this.message = message;
        this.from = callback;
    }
}

/**
 * Allows you to safely build errors
 * @param {(value:any)=>any} callback
 * @returns {(template:TemplateStringsArray,...values:any)=>Message}
 */
const error = (callback) => (template, ...values) =>
    new Message(
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
        }, ""),
        callback
    );

/**
 * @param  {...Filter<any>} filter
 * @return {Filter<any>}
 */
const compose = (...filter) => (value, ...args) =>
    filter.reduce((prev, next) => (value) =>
        next(prev(value, ...args), ...args)
    )(value);

/**
 * @template T
 * @callback Filter
 * @param {T} value
 * @return {T}
 */

export { Message, compose, error };
//# sourceMappingURL=utils.js.map
