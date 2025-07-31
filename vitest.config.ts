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
    watchExclude: ['**/node_modules/**', '**/dist/**'],
    
    // Optimize parallelism for 10-core system  
    pool: 'forks', // Use forks for true parallelism with CPU-intensive SAT solving
    poolOptions: {
      forks: {
        maxForks: 10,      // Use all available cores
        minForks: 4,       // Keep minimum pool for fast startup
      }
    },
    fileParallelism: true,  // Ensure test files run in parallel
    // Alternative: could try maxWorkers/minWorkers directly
    // maxWorkers: 10,
    // minWorkers: 4
  }
});