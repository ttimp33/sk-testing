import { expect, test } from "@playwright/test";

test('Home page loads and Counter component works end-to-end', async ({ page }) => {
    // 1. Navigate to the base URL (which is handled by Playwright config)
    await page.goto('/');

    // 2. Assert: Check the main heading is visible
    await expect(page.getByRole('heading', { name: "Welcome to the Simple Test App!"})).toBeVisible();

    // 3. Act: Find the counter button, which starts at 10 (from +page.svelte)
    const counterButton = page.getByRole('button', { name: /Count is 10/i});
    await expect(counterButton).toBeVisible();

    // 4. Act: Click the button twice
    await counterButton.click();
    await counterButton.click();

    // 5. Assert: Check the final state of the counter after two clicks
    await expect(page.getByRole('button', { name: /Count is 12/i})).toBeVisible();
});