module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'no-console': 'off',
        'no-underscore-dangle': 'off',
        'class-methods-use-this': 'off',
        'max-len': ['error', { code: 80, tabWidth: 4 }],
        quotes: ['error', 'single'],
        'no-restricted-exports': ["error", {
          "restrictedNamedExportsPattern": "bar$"
        }]
    },
};
