module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.(ts|js)'],
  // mock global do ORM para todos os testes
  setupFilesAfterEnv: ['<rootDir>/src/prisma/__tests__/prisma.singleton.ts'],
  clearMocks: true
};
