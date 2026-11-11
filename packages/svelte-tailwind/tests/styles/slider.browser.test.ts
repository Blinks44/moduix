import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import SliderOverride from './SliderOverride.svelte';

test('uses Tailwind-owned visual defaults and lets consumer utilities win', async () => {
  const { container } = render(SliderOverride);

  const label = container.querySelector('[data-slot="slider-label"]')!;
  const control = container.querySelector('[data-slot="slider-control"]')!;
  const marker = container.querySelector('[data-slot="slider-marker"]')!;
  expect([...label.classList]).toContain('text-primary');
  expect([...control.classList]).toContain('min-h-6');
  await expect.element(page.locator('[data-slot="slider-root"]')).toHaveCSS('width', '256px');
  await expect
    .element(page.locator('[data-slot="slider-control"]'))
    .toHaveCSS('min-height', '24px');
  await expect.element(page.locator('[data-slot="slider-track"]')).toHaveCSS('height', '6px');
  await expect.element(page.getByRole('slider', { name: 'Volume' })).toHaveCSS('width', '16px');
  expect(getComputedStyle(marker, '::before').width).toBe('4px');
});