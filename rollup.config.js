import json from "@rollup/plugin-json";
import {terser} from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import * as pkg from "./package.json";

const
  input="./src/index.js",
  globals={ "jsonstat-toolkit": "JSONstat" },
  external=["jsonstat-toolkit"],
  preamble=`// ${pkg.name} v${pkg.version} Copyright ${(new Date).getFullYear()} ${pkg.author.name} ${pkg.homepage}`,
  plugins=[
    babel({ babelHelpers: "bundled" }),
    json(),
    terser({ output: { preamble } })
  ]
;

export default [
  {
    input,
    external,
    output: [
      {
        name: "EuroJSONstat",
        file: pkg.unpkg,
        format: "iife",
        globals
      },
      {
        file: pkg.module,
        format: "esm",
        globals
      },
      {
        file: pkg.main,
        format: "cjs",
        globals
      }
    ],
    plugins
  },
  {
      input,
      output: {
        file: "import.mjs",
        format: "esm",
      },
      plugins: [
        resolve({ mainFields: ["browser"] }),
        ...plugins
      ]
    }
];
