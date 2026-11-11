import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import LightboxOverride from './LightboxOverride.svelte';

test('merges consumer utilities over Tailwind defaults', async () => {
  render(LightboxOverride);

  expect([...document.querySelector('[data-slot="lightbox-backdrop"]')!.classList]).toEqual(
    expect.arrayContaining(['bg-red-500']),
  );
  expect([...document.querySelector('[data-slot="lightbox-positioner"]')!.classList]).toEqual(
    expect.arrayContaining(['p-8']),
  );
  expect([...document.querySelector('[data-slot="lightbox-close-icon"]')!.classList]).toEqual(
    expect.arrayContaining(['size-10']),
  );
  expect([...document.querySelector('[data-slot="lightbox-content"]')!.classList]).toEqual(
    expect.arrayContaining(['max-w-full']),
  );
  expect([...document.querySelector('[data-slot="lightbox-image"]')!.classList]).toEqual(
    expect.arrayContaining(['rounded-none']),
  );

  await expect
    .element(page.locator('[data-slot="lightbox-positioner"]'))
    .toHaveCSS('padding', '32px');
  await expect
    .element(page.locator('[data-slot="lightbox-close-icon"]'))
    .toHaveCSS('width', '40px');
  await expect
    .element(page.locator('[data-slot="lightbox-image"]'))
    .toHaveCSS('border-radius', '0px');
});