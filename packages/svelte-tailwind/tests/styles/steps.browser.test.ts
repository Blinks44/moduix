import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import StepsOverride from './StepsOverride.svelte';

test('styles empty visual parts and lets consumer utilities override defaults', async () => {
  render(StepsOverride);

  const indicators = document.querySelectorAll('[data-slot="steps-indicator"]');

  expect([...indicators[1]!.classList]).toEqual(expect.arrayContaining(['size-6']));
  await expect
    .element(page.locator('[data-slot="steps-indicator"]').nth(1))
    .toHaveCSS('width', '24px');
  await expect
    .element(page.locator('[data-slot="steps-indicator"]').nth(1))
    .toHaveCSS('height', '24px');
});