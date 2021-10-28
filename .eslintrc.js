module.exports = {
    env: {
        browser: true,
        es2021: true,
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
    },
    rules: {
        'eqeqeq': ['error', 'always'],
        'quotes': ['warn', 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': false,
        }],
    },
};
