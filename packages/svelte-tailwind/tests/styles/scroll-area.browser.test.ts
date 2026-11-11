import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import ScrollAreaOverride from './ScrollAreaOverride.svelte';

test('lets consumer Tailwind classes override component defaults', async () => {
  render(ScrollAreaOverride);

  const root = document.querySelector('[data-slot="scroll-area-root"]')!;
  const viewport = document.querySelector('[data-slot="scroll-area-viewport"]')!;
  const scrollbar = document.querySelector('[data-slot="scroll-area-scrollbar"]')!;
  const thumb = document.querySelector('[data-slot="scroll-area-thumb"]')!;

  expect([...root.classList]).toEqual(expect.arrayContaining(['h-20']));
  expect([...viewport.classList]).toEqual(expect.arrayContaining(['rounded-none']));
  expect([...scrollbar.classList]).toEqual(expect.arrayContaining(['opacity-100']));
  expect([...thumb.classList]).toEqual(expect.arrayContaining(['bg-primary']));
  await expect.element(page.locator('[data-slot="scroll-area-root"]')).toHaveCSS('height', '80px');
  await expect
    .element(page.locator('[data-slot="scroll-area-viewport"]'))
    .toHaveCSS('border-radius', '0px');
  await expect
    .element(page.locator('[data-slot="scroll-area-scrollbar"]'))
    .toHaveCSS('opacity', '1');
});