import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from '@rollup/plugin-commonjs';
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf-8"));

export default [
  {
    input: "src/index.ts",
    output: [
      {
        name: "FT",
        file: pkg.browser,
        format: "umd",
        sourcemap: true,
        external: ["console"],
        globals: {
          console: "console",
        },
      },
      {
        file: pkg.module,
        format: "es",
        external: ["console"],
        globals: {
          console: "console",
        }
      },
    ],
    plugins: [typescript(), nodeResolve({ preferBuiltins: false }), commonjs()],
  },
];
