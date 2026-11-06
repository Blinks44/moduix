import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import StyledTour from './StyledTour.svelte';

test('applies Tailwind defaults and lets consumer utilities win', async () => {
  render(StyledTour);
  await page.getByRole('button', { name: 'Start styled tour', exact: true }).click();

  await expect.element(page.locator('[data-slot="tour-content"]')).toHaveCSS('width', '384px');
  await expect.element(page.locator('[data-slot="tour-content"]')).toHaveCSS('padding', '16px');
  await expect.element(page.locator('[data-slot="tour-close-icon"]')).toHaveCSS('width', '32px');
});