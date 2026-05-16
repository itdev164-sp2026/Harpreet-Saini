import { test, expect } from '@playwright/test';

const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;

test.describe('Authentication and Navigation', () => {
  test('LOGIN PAGE VISIBLE: Login form is visible', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Check for email input
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
    
    // Check for password input
    await expect(page.getByRole('textbox', { name: /password/i })).toBeVisible();
    
    // Target the submit button specifically (type="submit")
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
  });

  test('REDIRECT AFTER LOGIN: Successful login redirects to dashboard', async ({ page }) => {
    if (!TEST_USER_EMAIL || !TEST_USER_PASSWORD) {
      test.skip(true, 'TEST_USER_EMAIL and TEST_USER_PASSWORD must be set in .env.local');
      return;
    }

    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Fill in credentials
    await page.getByPlaceholder('you@example.com').fill(TEST_USER_EMAIL);
    await page.getByRole('textbox', { name: /password/i }).fill(TEST_USER_PASSWORD);
    
    // Click the submit button (type="submit")
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    // Wait for navigation - check what URL you redirect to
    await page.waitForURL(/.*(projects|dashboard).*/, { timeout: 15000 });
  });

  test('SIDEBAR NAVIGATION: Sidebar links are visible after login', async ({ page }) => {
    if (!TEST_USER_EMAIL || !TEST_USER_PASSWORD) {
      test.skip(true, 'Test credentials not configured');
      return;
    }

    // Login first
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    await page.getByPlaceholder('you@example.com').fill(TEST_USER_EMAIL);
    await page.getByRole('textbox', { name: /password/i }).fill(TEST_USER_PASSWORD);
    
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();
    
    await page.waitForURL(/.*(projects|dashboard).*/, { timeout: 15000 });
    
    // Check for "My Projects" button (from your debug output)
    await expect(page.getByRole('button', { name: 'My Projects' })).toBeVisible();
  });
});
