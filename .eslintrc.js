module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 11,
    // using separate tsconfig because it should include all tsfiles, otherwise eslint will throw error
    // this is only related to lint-staged because lint-staged ignores ignorePatterns setting
    project: "./tsconfig.eslint.json",
    sourceType: "module",
  },

  ignorePatterns: ["*.stories.tsx", "jest.setup.ts"],
  rules: {
    "id-length": [
      "error",
      {
        min: 3,
        exceptions: [
          "en",
          "ru",
          "t",
          "id",
          "to",
          "x",
          "y",
          // For sort functions
          "a",
          // For sort functions
          "b",
          // For `for` iterator counters
          "i",
          // For `catch` without error argument
          "_",
        ],
      },
    ],
    /**
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
     */
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        types: ["boolean"],
        format: ["camelCase"],
        custom: { regex: "^(is|are|has|was|should|can)", match: true },
      },
      {
        selector: "property",
        types: ["boolean"],
        format: ["camelCase"],
        custom: {
          regex: "^(is|are|has|was|should|can|status|value|required|use)",
          match: true,
        },
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/array-type": ["error", { default: "array" }],
    "@typescript-eslint/no-namespace": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/destructuring-assignment": ["error", "never"],
    "react/jsx-boolean-value": ["error", "always"],
    "react/jsx-curly-brace-presence": ["error", { props: "always" }],
    "jest/consistent-test-it": ["error", { fn: "test" }],
    "no-empty": "off",
    "import/no-default-export": "error",
    "import/no-duplicates": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
  overrides: [
    {
      files: ["*.styled.tsx"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          {
            allowExpressions: true,
          },
        ],
      },
    },
  ],
  settings: {
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
  },
};
