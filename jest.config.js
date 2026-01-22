module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  testMatch: [
    '**/__tests__/**/*.js',
    '**/*.test.js',
    '**/*.spec.js'
  ],
  collectCoverageFrom: [
    'app/assets/js/**/*.js',
    '!app/assets/js/main.js',
    '!app/assets/js/index.js',
    '!app/assets/js/bundle.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true
};
