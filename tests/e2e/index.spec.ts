import { test, expect } from '@playwright/test'

test('homepage has correct title', async ({ page }) => {
  await page.goto('/');
  const title = await page.title();
  expect(title).toBe('Weather application');
})
