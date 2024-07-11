module.exports = {
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
