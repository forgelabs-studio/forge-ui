import { expect, test } from '@playwright/test'

test('marketing page content stays within the mobile viewport and renders charts', async ({
  page,
}) => {
  await page.goto('/')

  await expect(page.getByText('Everything you need to build polished interfaces.')).toBeVisible()

  await expect
    .poll(() =>
      page.evaluate(() => ({
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
      })),
    )
    .toMatchObject({
      viewportWidth: expect.any(Number),
      documentWidth: expect.any(Number),
      bodyWidth: expect.any(Number),
    })

  const overflow = await page.evaluate(() => {
    const viewportWidth = window.innerWidth

    return {
      documentOverflow: document.documentElement.scrollWidth - viewportWidth,
      bodyOverflow: document.body.scrollWidth - viewportWidth,
    }
  })

  expect(overflow.documentOverflow).toBeLessThanOrEqual(1)
  expect(overflow.bodyOverflow).toBeLessThanOrEqual(1)

  await page.waitForFunction(() => Boolean((window as { Chart?: unknown }).Chart), null, {
    timeout: 15_000,
  })

  const visibleChartCanvases = page
    .locator('.forge-donut-wrap canvas, .forge-linechart-wrap canvas')
    .filter({ visible: true })

  await expect(visibleChartCanvases).toHaveCount(2)
})
