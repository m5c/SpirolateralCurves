import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";

// Additional import required for linting (requiring) comments
import jsdoc from "eslint-plugin-jsdoc";

export default defineConfig([
    // Override eslint formatting rules, with prettier (an actual formatter) rules, apply to ALL files.
    prettier,
    {
        rules: {
            "max-len": [
                "warn",
                {
                    code: 120,
                    ignoreUrls: true,
                    ignoreStrings: false,
                    ignoreTemplateLiterals: false,
                },
            ],
        },
    },
    // Language specific rules
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
                        "ArrowFunctionExpression",
                        "ClassDeclaration",
                        "FunctionDeclaration",
                        "MethodDefinition",
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
