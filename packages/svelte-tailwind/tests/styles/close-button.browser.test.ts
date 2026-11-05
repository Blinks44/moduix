import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import CloseButtonOverride from './CloseButtonOverride.svelte';

test('preserves parent data hooks through asChild and lets consumer utilities override defaults', async () => {
  render(CloseButtonOverride);

  const button = screen.getByRole('button', { name: 'Close panel' });

  expect(button.classList.contains('size-10')).toBe(true);
  expect(button.dataset).toMatchObject({
    scope: 'accordion',
    part: 'trigger',
    slot: 'accordion-trigger',
  });
  await expect
    .element(page.getByRole('button', { name: 'Close panel' }))
    .toHaveAttribute('data-disabled');
});