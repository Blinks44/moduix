import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import DialogOverride from './DialogOverride.svelte';

test('lets consumer Tailwind utilities override part defaults', async () => {
  render(DialogOverride);
  await expect.element(page.getByRole('dialog')).toHaveCSS('padding', '16px');
  await expect
    .element(page.getByRole('button', { name: 'Close dialog' }))
    .toHaveCSS('width', '32px');
});