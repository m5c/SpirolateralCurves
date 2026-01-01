import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

// Additional import required for linting (requiring) comments
import jsdoc from "eslint-plugin-jsdoc";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
  // Additionally, require typescript files to be commented (requires jsdoc plugin)
  {
    files: ["**/*.{ts,mts,cts}"],
    plugins: { jsdoc },
    rules: {
      "jsdoc/require-jsdoc": [
        "error",
        {
          // Require comments for classes, methods, and constructors
          contexts: [
            "ClassDeclaration",
            "FunctionDeclaration",
            'MethodDefinition[kind="constructor"]',
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.md"],
    plugins: { markdown },
    language: "markdown/gfm",
    extends: ["markdown/recommended"],
  },
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
]);
