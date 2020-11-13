module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.s?css$':
      'identity-obj-proxy' || require.resolve('./tests/mocks/style-mock.ts')
  },
  testPathIgnorePatterns: [
    '<rootDir>/(dist|node_modules|types|tests/mocks|tests/coverage)/'
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  coverageDirectory: 'tests/coverage',
  collectCoverageFrom: ['src/**/*.{ts,js}', 'examples/**/*.{ts,js}'],
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 24,
      functions: 17,
      lines: 12
    }
  }
}
