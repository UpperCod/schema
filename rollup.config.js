import resolve from "@rollup/plugin-node-resolve";
import builtins from "builtin-modules";
import pkg from "./package.json";

export default {
    input: ["./src/schema.js"],
    output: {
        dir: "./",
        format: "./",
        sourcemap: true,
    },
    external: [...builtins, ...Object.keys(pkg.dependencies)],
    plugins: [resolve()],
};
