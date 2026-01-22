module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.ts'
  },
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/__tests__/**/*.tsx',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx'
  ],
  collectCoverageFrom: [
    'app/assets/js/**/*.ts',
    'app/assets/js/**/*.tsx',
    '!app/assets/js/main.ts',
    '!app/assets/js/index.tsx',
    '!app/assets/js/bundle.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
