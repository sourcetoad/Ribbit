const {jsWithBabel: tsjPreset} = require('ts-jest/presets');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    moduleFileExtensions: [
        'js',
        'json',
        'jsx',
        'ts',
        'tsx',
    ],
    rootDir: '.',
    roots: [
        '<rootDir>/tests',
        '<rootDir>/src',
        '<rootDir>/node_modules',
    ],
    setupFilesAfterEnv: [
        '<rootDir>/jest.setup.js',
    ],
    testEnvironment: 'jsdom',
    transform: {
        ...tsjPreset.transform
    },
    transformIgnorePatterns: [],
    testMatch: [
        "<rootDir>/tests/**/*\\.spec\\.(ts|tsx|js)"
    ],
    verbose: true,
};
