module.exports = {
    env: {
        browser: true,
        es6: true,
        // This is needed to prevent errors in webpack.config.js about `module` and `__dirname` being undefined.
        node: true,
        // This is needed to prevent errors in tests about Jest functions being undefined.
        jest: true,
    },
    extends: [
        'eslint:recommended',
    ],
    ignorePatterns: [
        'dist/**/*',
        'babel.config.js',
    ],
    parserOptions: {
        sourceType: 'module',
        // We need a high enough ECMA version to support nullish assignment.
        ecmaVersion: 2021,
    },
    rules: {
        'eqeqeq': ['error', 'always'],
        'no-console': ['warn', {
            'allow': ['warn', 'error'],
        }],
        'no-unused-vars': 'warn',
        'quotes': ['warn', 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': false,
        }],
    },
};
