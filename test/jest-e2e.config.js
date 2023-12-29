const jestConfig = require('./jest.config.js');

module.exports = {
  ...jestConfig,
  moduleFileExtensions: ["js", "json", "ts"],
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  coverageDirectory: 'coverage/e2e',
  roots: ['<rootDir>'],
  collectCoverageFrom: ['src/**'],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
}
