# Environment

## Linting

More details on how this interacts with `npm` later, but essentially:

* `npm init @eslint/config@latest` (opens a dialogue, select your options with `space`, then enter)
  * Creates a new config file: `eslint.config.mts` (the actual linter configuration)
  * Modifies `package.json`, by adding dependencies for the linter to the `devDependencies` section.
  * One extra dev dependency is required, because we're working with typescript:
    * Add to `devDependencies`: `"jiti": "^2.6.1"`
    * Then reinstall dev dependencies, with: `npm install --only=dev`
* Now we can actually run the linter: `npx eslint src`

 > Note: `devDependencies` are dependencies needed for `building`, i.e. not needed during program execution.

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

To install a *local* dependency, e.g. a linter: `npm init @eslint/config@latest`

### NPX

 > *Runs packages, e.g. the linter - but does not need the package to be defined in `package.json`.*

So in essence this is an alternative to:

- First defining a dependency in `script` section of `package.json`
- Then calling that script with `npm run name-of-script`

Tip: Define script, that invokes `npx`, e.g.:



## VSCode IDE

### Hotkeys

- Format code: `⌥ + ⇧ + f`

### Plugins

- [VSCode mermaid preview](https://marketplace.visualstudio.com/items?itemName=vstirbu.vscode-mermaid-preview)
