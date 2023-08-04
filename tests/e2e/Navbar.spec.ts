import { test, expect } from '@playwright/test';


test.describe('Navigation bar should ', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('hide and display the navigation links on mobile version', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 800 });

    const navLinksHidden = page.getByTestId('navbar-link-container')
    expect(navLinksHidden).toBeHidden();

    await page.getByTestId('navbar-toggle-button').click();
    
    const navLinksVisible = page.getByTestId('navbar-link-container')
    expect(navLinksVisible).toBeVisible();
  });

})


