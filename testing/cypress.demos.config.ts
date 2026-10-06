import { defineConfig } from 'cypress';

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    specPattern: 'cypress/demos/**/*.spec.ts',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: '.cypress/screenshots',
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
