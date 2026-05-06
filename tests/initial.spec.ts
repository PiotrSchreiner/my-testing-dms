import { expect, test } from '@playwright/test';

test.describe('Basic App Launch', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('should show the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Vuefinder/i);
  });

  test('should render the main application', async ({ page }) => {
    test.fixme(
      true,
      'Selektor .v-f-toolbar wird in der Preview-Umgebung noch nicht stabil erkannt'
    );

    const mainApp = page.locator('#app');
    await expect(mainApp).toBeVisible();

    const appName = page.locator('.v-f-toolbar').getByText('Vuefinder', { exact: false });
    await expect(appName.first()).toBeVisible();
  });

  test('should display the file explorer content', async ({ page }) => {
    const explorer = page.locator('.vuefinder, .v-f-container, #app');
    await expect(explorer.first()).toBeVisible({ timeout: 15000 });

    await page.waitForLoadState('networkidle');

    const body = page.locator('body');
    await expect(body).toContainText('Vuefinder', { ignoreCase: true });
  });
});
