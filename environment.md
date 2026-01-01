# Environment

## Command line tools

### Typescript compiler

- Install with `brew install tsc`
- Compile files with `tsc file.ts` (produces `.js` file.)

### Compile and run

- Build, i.e. compile all typescript files: `tsc src/*.ts`
- Run (using node interpreter): `node src/Launcher.js`
- Clean up: `rm src/*js`

### NPM

- Create a default package.json file: `npm init -y`
- `npm` scripts can then be defined in the `scripts` field, e.g.:

```json
 "scripts": {
   "exec": "tsc src/*.ts; node ./src/SpirolateralCurveGenerator.js; rm src/*.js"
 }
```

- To run any defined script, use: `npm run exec` (or replace `exec` by any script name).

## VSCode IDE 

### Hotkeys

- Format code: `⌥ + ⇧ + f`

### Plugins

- [VSCode mermaid preview](https://marketplace.visualstudio.com/items?itemName=vstirbu.vscode-mermaid-preview)
