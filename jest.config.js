module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/(dist|node_modules|types|tests/mocks|tests/coverage)/'
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  coverageDirectory: 'tests/coverage',
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 24,
      functions: 17,
      lines: 12
    }
  }
}
