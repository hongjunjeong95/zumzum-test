module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "..",
  clearMocks:true,
  testEnvironment: "node",
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  moduleNameMapper: {
    '^@helpers(.*)$': '<rootDir>/src/common/helpers$1',
    "^@common(.*)$": "<rootDir>/src/common$1",
    "^@domain(.*)$": "<rootDir>/src/domain$1",
    "^@auth(.*)$": "<rootDir>/src/auth$1",
  },
}
