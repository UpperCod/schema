export * from "./utils";
/**
 * Create a filter map, which will then be
 * used to compare with the input data
 * @param {Data} schema
 * @return {(data:Data)=>Data}
 */
export function schema(schema) {
    return (data) => {
        /**@type {Data} */
        const valid = {};
        /**@type {Data} */
        const invalid = {};
        for (const prop in schema) {
            try {
                valid[prop] = schema[prop](data[prop], prop, valid);
            } catch (error) {
                invalid[prop] = error;
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
