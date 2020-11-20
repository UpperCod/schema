export * from "./utils";
/**
 * Create a filter map, which will then be
 * used to compare with the input data
 * @param {Data} data
 * @return {(data:Data)=>Promise<Data>}
 */
export function schema(data) {
    /** @type {Filters} */
    const filters = {};
    for (const prop in data) {
        filters[prop] = async (value) => data[prop](value);
    }

    return (data) => {
        /**@type {Promise<any>[]} */
        const task = [];
        /**@type {Data} */
        const valid = {};
        /**@type {Data} */
        const invalid = {};
        for (const prop in filters) {
            task.push(
                filters[prop](data[prop] || {}).then(
                    (value) => (valid[prop] = value),
                    (value) => (invalid[prop] = value)
                )
            );
        }
        /**
         * filters are resolved in parallel
         */
        return Promise.all(task).then(() =>
            Object.keys(invalid).length ? Promise.reject(invalid) : valid
        );
    };
}

/**
 * @typedef {Object<string,any>} Data
 */

/**
 * @typedef {Object<string,(value:any)=>Promise<any>>} Filters
 */
