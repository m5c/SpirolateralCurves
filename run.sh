#!/bin/bash

tsc src/*.ts
node ./src/SpirolateralCurveGenerator.js
rm src/*.js
