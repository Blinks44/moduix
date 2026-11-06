import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import PopoverOverride from './PopoverOverride.svelte';

test('lets consumer Tailwind utilities win', async () => {
  render(PopoverOverride);
  const trigger = document.querySelector('[data-slot="popover-trigger"]')!;
  const content = document.querySelector('[data-slot="popover-content"]')!;
  const closeIcon = document.querySelector('[data-slot="popover-close-icon"]')!;
  expect(Array.from(trigger.classList)).toEqual(expect.arrayContaining(['bg-primary', 'px-2']));
  expect(Array.from(content.classList)).toEqual(expect.arrayContaining(['w-96', 'bg-card', 'p-4']));
  expect(Array.from(closeIcon.classList)).toEqual(
    expect.arrayContaining(['size-8', 'rounded-full', 'bg-primary']),
  );
  await expect.element(page.getByTestId('content')).toHaveCSS('padding', '16px');
  await expect
    .element(page.getByRole('button', { name: 'Open', exact: true }))
    .toHaveCSS('padding-left', '8px');
  await expect
    .element(page.getByRole('button', { name: 'Close popover' }))
    .toHaveCSS('width', '32px');
});