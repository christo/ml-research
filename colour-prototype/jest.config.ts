// the following import causes weird warning:
// TS2306: File
// /Users/christo/src/christo/ml-research/colour-prototype/node_modules/@types/jest/index.d.ts
// is not a module.
// @ts-ignore
import type {Config} from 'jest';

console.log("running jest test config");
const config: Config = {

    testEnvironment: 'node',
    verbose: true,
    roots: [
        "./src/__tests__"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
        "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
    }
};

export default config;