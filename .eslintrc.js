module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,
    cypress: true,
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
        "json": "never"
      }
    ],
    "import/prefer-default-export": "off",
    "no-console": "off",
    "no-use-before-define": "off",
    "no-plusplus": "off",
    "no-param-reassign": "off",
  },
};
