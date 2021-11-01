const { jsWithBabel: tsjPreset } = require('ts-jest/presets');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        './jest.setup.js',
    ],
    transform: {
        ...tsjPreset.transform
    },
    transformIgnorePatterns: [],
};
