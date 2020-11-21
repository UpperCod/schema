import { error, Message } from "./utils";
export * from "./utils";
/**
 * Create a filter map, which will then be
 * used to compare with the input data
 * @param {Data} schema
 * @param {(message:any)=>string} [log]
 * @return {(data:Data)=>Data}
 */
export function schema(schema, log) {
    return (data) => {
        /**@type {Data} */
        const valid = {};
        /**@type {Data} */
        const invalid = {};
        for (const prop in schema) {
            try {
                valid[prop] = schema[prop](data[prop], prop, valid);
            } catch (err) {
                if (!(err instanceof Message)) {
                    err = error(schema[prop])`${err}`;
                }
                err.value = data[prop];
                err.prop = prop;
                invalid[prop] = log ? log(err) : err;
            }
        }
        if (Object.keys(invalid).length) {
            throw invalid;
        } else {
            return valid;
        }
    };
}

/**
 * @typedef {Object<string,any>} Data
 */

/**
 * @typedef {Object<string,(value:any)=>Promise<any>>} Filters
 */
