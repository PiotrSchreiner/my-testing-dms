import { expect, test } from '@playwright/test';

test.describe('Basic App Launch', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('should show the correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Vuefinder/i);
  });

  test.skip('should render the main application', async ({ page }) => {
    const mainApp = page.locator('#app');
    await expect(mainApp).toBeVisible();
  });

  test('should display the file explorer content', async ({ page }) => {
    const explorer = page.locator('#app');
    await expect(explorer).toBeVisible({ timeout: 15000 });

    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toContainText('Vuefinder', { ignoreCase: true });
  });

  test('should show toolbar menu items', async ({ page }) => {
    await page.waitForSelector('body', { timeout: 10000 });

    const menuFile = page.getByText('File', { exact: true });
    await expect(menuFile.first()).toBeVisible({ timeout: 15000 });

    const menuEdit = page.getByText('Edit', { exact: true });
    await expect(menuEdit.first()).toBeVisible();
  });
});

test.describe('UI Interaction Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('should open the File menu on click', async ({ page }) => {
    const fileMenu = page.getByText('File', { exact: true }).first();
    await fileMenu.click();

    const newFolderOption = page.getByText('New Folder', { exact: true });
    await expect(newFolderOption.first()).toBeVisible({ timeout: 5000 });
  });

  test.skip('should toggle the search overlay', async ({ page }) => {
    const searchButton = page
      .locator('button')
      .filter({ has: page.locator('svg') })
      .locator('visible=true');
    await searchButton
      .getByTitle(/Search/i)
      .or(page.getByLabel(/Search/i))
      .first()
      .click();

    const searchInput = page.locator('input').first();
    await expect(searchInput).toBeVisible({ timeout: 5000 });
  });
});
