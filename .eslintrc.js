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
        'plugin:@typescript-eslint/recommended',
    ],
    ignorePatterns: [
        'dist/**/*',
        'babel.config.js',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        'eqeqeq': ['error', 'always'],
        'quotes': ['warn', 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': false,
        }],
        '@typescript-eslint/no-inferrable-types': ['off'],
    },
};
