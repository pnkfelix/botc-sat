import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use ts-node to run TypeScript tests directly
    environment: 'node',
    globals: true,
    // Only include test files in src/tests/ with .test.ts extension
    include: ['src/tests/**/*.test.ts'],
    // Exclude current test files to avoid conflicts during migration
    exclude: ['src/tests/test-runner.ts', 'src/tests/**/!(*.test).ts'],
    // Enable watch mode by default
    watch: true,
    // Fast file watching
    watchExclude: ['**/node_modules/**', '**/dist/**']
  }
});