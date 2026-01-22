// Test setup file for Jest
// This file runs before each test file

// Suppress console errors during tests (optional - can be removed for debugging)
// global.console.error = jest.fn();

// Mock window.matchMedia for tests that might use it
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

// Add any global test utilities or mocks here
