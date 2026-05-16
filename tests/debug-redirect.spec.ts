import { test, expect } from '@playwright/test';

test('debug redirect after login', async ({ page }) => {
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;
  
  console.log('Testing with email:', email);
  
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  
  // Fill in credentials
  await page.getByPlaceholder('you@example.com').fill(email);
  await page.getByRole('textbox', { name: /password/i }).fill(password);
  
  // Click submit
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.click();
  
  // Wait a bit and check the URL
  await page.waitForTimeout(5000);
  console.log('Current URL after 5 seconds:', page.url());
  
  // Take screenshot
  await page.screenshot({ path: 'after-login.png' });
  
  // Check if there's any error message
  const errorMessage = await page.getByText(/error|invalid|incorrect/i).textContent().catch(() => null);
  if (errorMessage) {
    console.log('Error message found:', errorMessage);
  }
});
