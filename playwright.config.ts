import { defineConfig } from "@playwright/test";
import { config } from "dotenv";
import path from "path";

// Load environment variables from .env.local
config({ path: ".env.local" });

export default defineConfig({
  testDir: "./tests",
  
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
  
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
});
