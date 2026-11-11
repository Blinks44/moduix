import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import TooltipOverride from './TooltipOverride.svelte';

test('applies Tailwind defaults and lets consumer utilities override them', async () => {
  render(TooltipOverride);
  await expect.element(page.getByRole('tooltip')).toBeVisible();
  const trigger = document.querySelector('[data-slot="tooltip-trigger"]')!;
  expect([...trigger.classList]).toEqual(expect.arrayContaining(['px-2', 'text-primary']));
  expect([...document.querySelector('[data-slot="tooltip-positioner"]')!.classList]).toContain(
    'max-w-none',
  );
  expect([...document.querySelector('[data-slot="tooltip-arrow-tip"]')!.classList]).toContain(
    'border-primary',
  );
  await expect.element(page.getByTestId('content')).toHaveCSS('padding-left', '24px');
  await expect.element(page.getByTestId('content')).toHaveCSS('text-align', 'left');
  await expect.element(page.getByRole('button', { name: 'Save' })).toHaveCSS('padding-left', '8px');
});