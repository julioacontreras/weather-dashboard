import { test, expect } from '@playwright/test'

test('homepage has correct title', async ({ page }) => {
  await page.goto('/');
  const title = await page.title();
  expect(title).toBe('Weather application');
})

test('search a city and get the weather', async ({ page }) => {
  await page.goto('/');

  await page.fill('#search-city', 'Tokyo');

  await page.click('button');

  await page.waitForURL('**/weather?localization=Tokyo'); 

  await expect(page.url()).toContain('/weather?localization=Tokyo');

  await expect(page.locator('#title')).toHaveText('Tokyo');
})