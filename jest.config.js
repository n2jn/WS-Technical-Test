module.exports = {
    preset: 'react-native',
    setupFiles: ['<rootDir>/jest.setup.js'],
    setupFilesAfterEnv: ['<rootDir>/extra/msw_api/node-server/setup.ts'],
    roots: ['<rootDir>/src', '<rootDir>/extra'],
    testMatch: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)'
    ],
    transformIgnorePatterns: [
      '/node_modules/(?!(@react-native|react-native|react-native-gesture-handler|@reduxjs|immer)/).*/',
    ],
    clearMocks: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}',
      '!src/**/__tests__/**',
      '!src/**/*.test.js',
      '!src/test-utils/**',
      'extra/**/*.{js,jsx,ts,tsx}',
      '!extra/**/__tests__/**',
      '!extra/**/*.test.{js,ts,tsx}'
    ],
  };