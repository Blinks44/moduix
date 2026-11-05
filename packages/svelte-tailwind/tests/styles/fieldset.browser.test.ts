import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import FieldsetOverride from './FieldsetOverride.svelte';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(FieldsetOverride);

  const fieldset = screen.getByRole('group', { name: 'Styled fieldset' });
  expect([...fieldset.classList]).toEqual(expect.arrayContaining(['gap-2', 'max-w-64']));
  expect([...fieldset.querySelector('legend')!.classList]).toEqual(
    expect.arrayContaining(['text-primary']),
  );
  await expect.element(page.locator('[data-slot="fieldset-root"]')).toHaveCSS('gap', '8px');
  await expect.element(page.locator('[data-slot="fieldset-root"]')).toHaveCSS('max-width', '256px');
});