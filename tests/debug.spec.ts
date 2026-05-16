import { test, expect } from '@playwright/test';

test('debug login page', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  
  // Take a screenshot
  await page.screenshot({ path: 'login-page.png' });
  
  // Find all buttons and log their text
  const buttons = await page.getByRole('button').all();
  console.log(`Found ${buttons.length} button(s):`);
  for (let i = 0; i < buttons.length; i++) {
    const text = await buttons[i].textContent();
    console.log(`  Button ${i + 1}: "${text}"`);
  }
  
  // Find all input fields
  const inputs = await page.getByRole('textbox').all();
  console.log(`Found ${inputs.length} input(s):`);
  for (let i = 0; i < inputs.length; i++) {
    const name = await inputs[i].getAttribute('name');
    const placeholder = await inputs[i].getAttribute('placeholder');
    console.log(`  Input ${i + 1}: name="${name}", placeholder="${placeholder}"`);
  }
});
