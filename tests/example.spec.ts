// import { test, expect } from '@playwright/test';

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

import { expect, test } from '@playwright/test';

test('Home page loads and Counter component works end-to-end', async ({ page }) => {
  // 1. Navigate to the base URL (which is handled by Playwright config)
  await page.goto('/');

  // 2. Assert: Check the main heading is visible
  await expect(page.getByTestId('page-title')).toHaveText('Welcome to the Simple Test App!');

  // 3. Act: Find the counter button, which starts at 10 (from +page.svelte)
  const counterButton = page.getByRole('button', { name: /Count is 10/i });
  await expect(counterButton).toBeVisible();

  // 4. CSS Property Test (Initial Active State)
  // Check the background color applied by the '.active' class (Blue: #007bff)
  // Note: Playwright returns computed color in rgb format.
  await expect(counterButton).toHaveCSS('background-color', 'rgb(0, 123, 255)');
  await expect(counterButton).toHaveCSS('color', 'rgb(255, 255, 255)'); // White text

  // 5. Act: Click the button (Logic Test)
  await counterButton.click();
  const newCounterButton = page.getByRole('button', { name: /Count is 11/i });

  // 6. CSS Property Test (Post-Increment)
  // The button should still be active, maintaining the blue background.
  await expect(newCounterButton).toHaveCSS('background-color', 'rgb(0, 123, 255)');
  
});
