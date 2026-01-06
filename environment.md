# Environment

## Linting

### Preamble

Linting is not the same as formatting: [^3](https://betterstack.com/community/guides/scaling-nodejs/prettier-vs-eslint/)

-   Linting is about sticking to coding best practices, i.e. if a language allows multiple constructs do achieve a functionality, the linter enforces using the generally agreed upon (or identifies constructs that are generally considered bugs e.g. unused variables).
-   Formatting is about where linebreaks are, how many spaces / tabs are used, where brackets are located. It does not care about coding best practices or finding bugs.

> Linters find issues, formatters change code layout [^4](https://prettier.io/docs/comparison). Usually you want both, a linter (e.g. eslint) and a formatter (prettier).

### Eslint

More details on how this interacts with `npm` later, but essentially:

-   `npm init @eslint/config@latest` (opens a dialogue, select your options with `space`, then enter)
    -   Creates a new config file: `eslint.config.mts` (the actual linter configuration)
    -   Modifies `package.json`, by adding dependencies for the linter to the `devDependencies` section.
    -   One extra dev dependency is required, because we're working with typescript:
        -   Add to `devDependencies`: `"jiti": "^2.6.1"`
        -   Then reinstall dev dependencies, with: `npm install --only=dev`
-   Now we can actually run the linter: `npx eslint src`

> Note: `devDependencies` are dependencies needed for `building`, i.e. not needed during program execution.

### Enforcing comments

EsLint does not require comments, but extending eslint with an extra package just for comments is possible:

-   Install eslint extension: `npm install --save-dev eslint-plugin-jsdoc`
-   Is identical to manually adding to `package.json` / `dev-dependencies`: `"eslint-plugin-jsdoc": "^61.5.0"`, followed by `npm install --only=dev`\

The comment extension still needs configuration.  
Edit `eslint.config.mts`, add two things:

-   An import:

```json
  // Additional import required for linting (requiring) comments
  import jsdoc from 'eslint-plugin-jsdoc';
```

-   A configuration, specifically for ts files (an additional entry to the existing `defineConfig` array):

```json
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
            'MethodDefinition',
          ],
      },
    ],
  },
}
```

Finally, test it with `npm run lint` -> shows errors for missing class documentation.

## Typescript compiler

### Module preamble

The linking between individual typescript (import / export syntax), works differently depending on the interpreter executing the produced JS files.

-   When interpreted by Node, the typescript files can be simply compiled as they are. Node will understands how individual files (modules) refer to one anoterh.
-   When interpreted by a browser, a little extra magic is needed, because the browser does not understand the typescript specific import syntax. There's a hack: adding the `.js` file extension for every import, but that is contrived. Better is to produce something on compilation that the browser understands. This is called "_bundling_", i.e. a command is used to fuse all produces JS files to a single `bundle.js` file.

### Compiling with npm

npm only calls the `tsc` command. It is prefectly fine to manually compile using the `tsc` command:

-   Install with `brew install tsc`
-   Compile files with `tsc file.ts` (produces `.js` file.)

Or, to have a cleaner process:

-   Build, i.e. compile all typescript files: `tsc src/*.ts`
-   Run (using node interpreter): `node src/Launcher.js`
-   Clean up: `rm src/*js`

#### npm scripts

-   Create a default package.json file: `npm init -y`
-   Update at least the `author` field.
-   `npm` scripts can then be defined in the `scripts` field, e.g.:

```json
 "scripts": {
   "lint": "echo linting...",
   "exec": "tsc src/*.ts; node ./src/SpirolateralCurveGenerator.js; rm src/*.js"
 }
```

-   To run any defined script, use: `npm run exec` (or replace `exec` by any script name).

### Compiling with a bundler

The bundler is `esbuild`. It is called like this:

`npx esbuild src/webui.ts   --bundle   --format=esm   --platform=browser --outfile=docs/bundle.js`

There are a few caveats:

-   The bundler optimizes the code, this also means it will strip a function if never called.
    -   Check the size of the generated `bundle.js`, must at least have 10-100kb.
-   There should be a separation between sources and generated js files. - In this repo, the `src` lies next to the `docs` repo (docs is deployed by github pages) - Configuration of source and target takes place via: `tsconfig.json`

```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "ES2015",

        "rootDir": "src",
        "outDir": "docs",

        "strict": true,
        "esModuleInterop": true,
        "sourceMap": true,
        "declaration": true
    },
    "include": ["src/**/*.ts"]
}
```

## Dependencies

To install a _local_ dependency, e.g. a linter: `npm init @eslint/config@latest`

### NPX

> _Runs packages, e.g. the linter - but does not need the package to be defined in `package.json`._

So in essence this is an alternative to:

-   First defining a dependency in `script` section of `package.json`
-   Then calling that script with `npm run name-of-script`

Tip: Define script, that invokes `npx`, e.g.:

## Unit tests

-   Create a new directory `tests`
-   Add individual tests using the naming convention `foo.test.ts`
-   Install jest:

    -   Jest itself: `npm install --save-dev jest ts-jest @types/jest`
    -   Jest typescript support: `npm install ts-jest --save-dev`
    -   Jest type support: `npm install @types/jest --save-dev`

-   Finally, configure jest via `package.json` to handle the sources as typescript:

```json
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
```

### Test syntax

Import the function you want to test, then define what is expected:

```typescript
import { Turtle } from "../src/Turtle";

describe("testing if advance correctly displaces north facing turtle", () => {
    test("turtle at expected x/y position", () => {
        const turtle = new Turtle(0, 0, 0);
        turtle.advance(1);
        expect(turtle.getPositionX()).toBe(0);
        expect(turtle.getPositionY()).toBe(-1);
    });
});
```

## Formatting

This one is a bit tricky, because there is an overlap between EsLint (which mainly lints and does some minimal formatting), and Prettier (which is a fully fletched formatter).

In short: A mismatch can be frustrating, because files formatted with prettier are rejected at the linter phase. So we need to override EsLint's minimal formatting with Prettiers.

### Hotkeys

-   Format code: `⌥ + ⇧ + f`

> Note: This must be configured to invoke Prettier in `Code -> Settings -> Settings -> Text Editor -> Default Formatter`.

#### Prettier

Prettier's default formatting rules are good, but some adjustments make sense, e.g. configuring a max line length (which unfortunately is never applied on comments).

1. Override EsLint formatting, so the linter does not get into our way when it comes to formatting.

    - Install the bridge between prettier en eslint: `npm install --save-dev eslint-config-prettier`
    - Override EsLint's formatting checks to whatever prettier produces in `eslint.config.mts`

        - `import prettier from "eslint-config-prettier";`
        - Add to `default` (all languages) rule:

        ```json
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
        ```

2. Configure Prettier to hard wrap on 120 characters, in `.prettierrc` (will not auto wrap comments)

```json
{
    "printWidth": 120,
    "tabWidth": 4,
    "useTabs": false
}
```

> About comments: Since eslint now uses prettiers formatting requirements, comments with more than 120 characters still raise a warning in the IDE. They need manual wrapping though. Good trick is to add a visual ruler to `.vscode/settings.json`, with `"editor.rulers": [120]`.

## Other Plugins

-   [VSCode mermaid preview](https://marketplace.visualstudio.com/items?itemName=vstirbu.vscode-mermaid-preview)

## Local hosting

Browsers do not allow dynamic manipulation of local svg files, it is essential to access the webapp through a file server, rather than via file system.

The easiest way the python server.

```bash
cd SpirolateralCurves/docs
python3 -m http.server &
open http://127.0.0.1:8000
```

## References

-   [^3]: Comparison of Prettier and EsLint
-   [^4]: Formatters vs linters (Prettier documentation)
