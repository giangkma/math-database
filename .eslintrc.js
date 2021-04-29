module.exports = {
    env: {
        es6: true,
        node: true,
    },
    extends: 'eslint:recommended',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    // parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    // plugins: [],
    rules: {
        'no-console': 'off',
        'func-names': 'off',
        'no-underscore-dangle': 'off',
        'consistent-return': 'off',
        'jest/expect-expect': 'off',
        'security/detect-object-injection': 'off',
    },
    settings: {},
};
