import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import SwapOverride from './SwapOverride.svelte';

test('applies owning Tailwind utilities and lets consumer classes override them', async () => {
  render(SwapOverride);

  await expect.element(page.getByTestId('swap')).toHaveCSS('place-items', 'start');
  await expect.element(page.getByTestId('indicator')).toHaveCSS('align-items', 'flex-start');
});