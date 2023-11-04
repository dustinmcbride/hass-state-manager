module.exports = {
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(mjs?|js?|tsx?|ts?)$",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.mjs$": "babel-jest",
    },
    testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/", "<rootDir>/tests/fixtures"],
    moduleFileExtensions: ["js", "jsx", "mjs"]
  }
