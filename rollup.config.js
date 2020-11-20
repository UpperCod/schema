import resolve from "@rollup/plugin-node-resolve";
import builtins from "builtin-modules";
import pkg from "./package.json";

export default {
    input: ["./src/index.js", "./src/filter.js", "./src/transform.js"],
    output: {
        dir: "./",
        format: "esm",
        sourcemap: true,
    },
    external: [...builtins, ...Object.keys(pkg.dependencies)],
    plugins: [resolve()],
};
