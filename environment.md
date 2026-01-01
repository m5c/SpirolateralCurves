# Environment

## Linting

More details on how this interacts with `npm` later, but essentially:

- `npm init @eslint/config@latest` (opens a dialogue, select your options with `space`, then enter)
  - Creates a new config file: `eslint.config.mts` (the actual linter configuration)
  - Modifies `package.json`, by adding dependencies for the linter to the `devDependencies` section.
  - One extra dev dependency is required, because we're working with typescript:
    - Add to `devDependencies`: `"jiti": "^2.6.1"`
    - Then reinstall dev dependencies, with: `npm install --only=dev`
- Now we can actually run the linter: `npx eslint src`

> Note: `devDependencies` are dependencies needed for `building`, i.e. not needed during program execution.

### Enforcing comments

EsLint does not require comments, but extending eslint with an extra package just for comments is possible:

- Install eslint extension: `npm install --save-dev eslint-plugin-jsdoc`
- Is identical to manually adding to `package.json` / `dev-dependencies`: `"eslint-plugin-jsdoc": "^61.5.0"`, followed by `npm install --only=dev`\

The comment extension still needs configuration.  
Edit `eslint.config.mts`, add two things:

- An import:

```json
  // Additional import required for linting (requiring) comments
  import jsdoc from 'eslint-plugin-jsdoc';
```

- A configuration, specifically for ts files (an additional entry to the existing `defineConfig` array):

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

## Command line tools

### Typescript compiler

- Install with `brew install tsc`
- Compile files with `tsc file.ts` (produces `.js` file.)

### Compile and run

- Build, i.e. compile all typescript files: `tsc src/*.ts`
- Run (using node interpreter): `node src/Launcher.js`
- Clean up: `rm src/*js`

### NPM

#### Init

- Create a default package.json file: `npm init -y`
- Update at least the `author` field.

#### Scripts

- `npm` scripts can then be defined in the `scripts` field, e.g.:

```json
 "scripts": {
   "lint": "echo linting...",
   "exec": "tsc src/*.ts; node ./src/SpirolateralCurveGenerator.js; rm src/*.js"
 }
```

- To run any defined script, use: `npm run exec` (or replace `exec` by any script name).

#### Add new dependencies

To install a _local_ dependency, e.g. a linter: `npm init @eslint/config@latest`

### NPX

> _Runs packages, e.g. the linter - but does not need the package to be defined in `package.json`._

So in essence this is an alternative to:

- First defining a dependency in `script` section of `package.json`
- Then calling that script with `npm run name-of-script`

Tip: Define script, that invokes `npx`, e.g.:

## Unit tests

- Create a new directory `tests`
- Add individual tests using the naming convention `foo.test.ts`
- Install jest:
  - Jest itself: `npm install --save-dev jest ts-jest @types/jest`
  - Jest typescript support: `npm install ts-jest --save-dev`
  - Jest type support: `npm install @types/jest --save-dev`
- Jest also has a config file, it can be initialized with: `npx ts-jest config:init` => `jest.config.js`:

```json
  import { createDefaultPreset } from "ts-jest";

  const tsJestTransformCfg = createDefaultPreset().transform;

  /** @type {import("jest").Config} **/
  export const testEnvironment = "node";
  export const transform = {
    ...tsJestTransformCfg,
  };
```

- Configure npm to know about the tests, by adding a `test` script calling `jest` to the `scripts` field:

```json
...jest
```

### Test syntax

Import the function you want to test, then define what is expected:

```typescript
import { advance } from "../src/turtle";

describe("testing index file", () => {
  test("empty string should result in zero", () => {
    expect(add("")).toBe(0);
  });
});
```

## VSCode IDE

### Hotkeys

- Format code: `⌥ + ⇧ + f`

### Plugins

- [VSCode mermaid preview](https://marketplace.visualstudio.com/items?itemName=vstirbu.vscode-mermaid-preview)
