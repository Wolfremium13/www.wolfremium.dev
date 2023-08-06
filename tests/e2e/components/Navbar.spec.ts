import { test, expect } from '@playwright/test';


test.describe('Navigation bar should ', () => {
  const minimumDesktopWidth = 768;
  const irrelevantHeight = 120;

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test.describe("on mobile window size", () => {
    const mobileWidth = minimumDesktopWidth - 1;
    test("have a toggle button", async ({ page }) => {
      await page.setViewportSize({ width: mobileWidth, height: irrelevantHeight });

      const button = await page.$('button');

      expect(button).not.toBeNull();
    });

    test("not display navigation links by default", async ({ page }) => {
      await page.setViewportSize({ width: mobileWidth, height: irrelevantHeight });

      const links = await page.$$('li');

      expect(links.length).toBe(0);
    });

    test("display navigation links when button is pressed", async ({ page }) => {
      await page.setViewportSize({ width: mobileWidth, height: irrelevantHeight });

      await page.click('button');

      const links = await page.$$('li');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  test.describe("on desktop window size", () => {
    test("not have a toggle button", async ({ page }) => {
      await page.setViewportSize({ width: minimumDesktopWidth, height: irrelevantHeight });
      const button = await page.$('button');

      expect(button).toBeNull();
    });

    test("display navigation links", async ({ page }) => {
      await page.setViewportSize({ width: minimumDesktopWidth, height: irrelevantHeight });

      const links = await page.$$('li');
      expect(links.length).toBeGreaterThan(1);
    });
  })
});


