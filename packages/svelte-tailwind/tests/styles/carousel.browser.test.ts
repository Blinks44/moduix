import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import CarouselOverride from './CarouselOverride.svelte';

test('lets consumers override runtime indicator sizing with state utilities', async () => {
  render(CarouselOverride);

  const currentIndicator = document.querySelector<HTMLElement>(
    '[data-slot="carousel-indicator"][data-current]',
  )!;

  expect([...currentIndicator.classList]).toEqual(
    expect.arrayContaining([
      'h-12',
      'w-20',
      'bg-transparent',
      'data-current:h-12',
      'data-current:w-20',
      'data-current:bg-transparent',
    ]),
  );
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('width', '80px');
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('height', '48px');
  await expect
    .element(page.getByRole('button', { name: 'Go to slide 1' }))
    .toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
});