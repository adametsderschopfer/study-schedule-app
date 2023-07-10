module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@app(.*)$": "<rootDir>/src/app$1",
    "^@config(.*)$": "<rootDir>/src/config$1",
    "^@domain(.*)$": "<rootDir>/src/domain$1",
    "^@store(.*)$": "<rootDir>/src/store$1",
    "^@ui(.*)$": "<rootDir>/src/ui$1",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
    "^@assets(.*)$": "<rootDir>/src/assets$1",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ["/lib/", "/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  testEnvironment: "jsdom",
};
