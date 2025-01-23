import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'], // Ubicación de los tests
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Opcional, si usas alias en tu tsconfig
  },
  setupFilesAfterEnv: ['./jest.setup.ts'], // Configuración adicional
};

export default config;
