import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import DrawerOverride from './DrawerOverride.svelte';

test('applies Tailwind defaults and lets consumer utilities win', async () => {
  render(DrawerOverride);
  const trigger = document.querySelector('[data-slot="drawer-trigger"]')!;
  const close = document.querySelector('[data-slot="drawer-close-icon"]')!;
  expect([...trigger.classList]).toEqual(['bg-primary', 'px-2']);
  expect([...close.classList]).toEqual(
    expect.arrayContaining(['size-8', 'rounded-full', 'bg-primary']),
  );
  await expect
    .element(page.getByRole('dialog'))
    .toHaveCSS('transition-property', 'transform, scale, translate');
  await expect.element(page.getByRole('dialog')).toHaveCSS('width', '384px');
  await expect.element(page.getByRole('dialog')).toHaveCSS('padding-top', '16px');
  await expect
    .element(page.getByRole('button', { name: 'Close drawer' }))
    .toHaveCSS('width', '32px');
});