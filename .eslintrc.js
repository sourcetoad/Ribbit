module.exports = {
    env: {
        browser: true,
        es2020: true,
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
        ecmaVersion: 2020,
    },
    rules: {
        'eqeqeq': ['error', 'always'],
        'quotes': ['warn', 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': false,
        }],
    },
};
