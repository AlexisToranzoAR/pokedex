module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "import/extensions": [
      "error",
      {
        "js": "always",
        "json": "sometimes"
      }
    ],
    "func-names": [
      "error",
      {
        "js": "always",
        "json": "sometimes"
      }
    ],
    "no-console": [
      "error",
      {
        "js": "always",
        "json": "sometimes"
      }
    ],
    "import/prefer-default-export": [
      "error",
      {
        "js": "always",
        "json": "sometimes"
      }
    ],
  },
};
