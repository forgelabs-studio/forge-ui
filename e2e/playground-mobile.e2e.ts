import { expect, test } from '@playwright/test'

test('UI playground mobile tabs expose components, preview, props, and copy command', async ({
  page,
}) => {
  await page.goto('/playground/ui')

  await expect(page.getByRole('button', { name: 'Components' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Preview' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Props' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Copy command/ })).toBeVisible()

  await page.getByRole('button', { name: 'Components' }).click()
  await expect(page.locator('.sidebar').last()).toBeVisible()
  await expect(page.getByPlaceholder('Search 40 components…').last()).toBeVisible()

  await page.getByRole('button', { name: 'Props' }).click()
  await expect(page.locator('.props-col').last()).toBeVisible()

  await page.getByRole('button', { name: 'Preview' }).click()
  await expect(page.locator('.centre').last()).toBeVisible()
})

test('motion playground mobile tabs expose presets, preview, props, and copy command', async ({
  page,
}) => {
  await page.goto('/playground/motion')

  await expect(page.getByRole('button', { name: 'Presets' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Preview' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Props' })).toBeVisible()
  await expect(page.getByRole('button', { name: /Copy command/ })).toBeVisible()

  await page.getByRole('button', { name: 'Presets' }).click()
  await expect(page.locator('.motion-sidebar').last()).toBeVisible()
  await expect(page.getByRole('button', { name: /FadeUp/ })).toBeVisible()

  await page.getByRole('button', { name: 'Props' }).click()
  await expect(page.locator('.props-col').last()).toBeVisible()
  await expect(page.getByText('ForgeFadeUp').last()).toBeVisible()

  await page.getByRole('button', { name: 'Preview' }).click()
  await expect(page.locator('.centre').last()).toBeVisible()
  await expect(
    page.locator('.centre').last().getByText('ForgeFadeUp', { exact: true }),
  ).toBeVisible()
})
