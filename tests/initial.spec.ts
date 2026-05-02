import { expect, test } from '@playwright/test';

test.describe('Basic App Launch', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
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
});
