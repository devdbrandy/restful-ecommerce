require('@babel/register');
require('./config');

module.exports = {
  collectCoverageFrom: ['src/**/*.js', '!**/node_modules/**', '!**/vendor/**'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/bin',
    '<rootDir>/src/database/migrations',
    '<rootDir>/src/database/seeders'
  ],
  globalSetup: '<rootDir>/test/setup.js', // setup database with migration
  globalTeardown: '<rootDir>/test/teardown.js', // teardown database
  clearMocks: true,
  restoreMocks: true,
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/?(*.)(spec|test).js',
    '<rootDir>/src/**/?(*.)(spec|test).js',
    '<rootDir>/test/**/?(*.)(spec|test).js'
  ]
};
