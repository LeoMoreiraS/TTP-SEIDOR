module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.(ts)'],
  // mock global do ORM para todos os testes
  setupFilesAfterEnv: ['<rootDir>/src/__mocks__/prisma.singleton.ts'],
  clearMocks: true
};
