import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import AutoplayCarousel from './carousel/AutoplayCarousel.svelte';
import ComposedCarousel from './carousel/ComposedCarousel.svelte';
import LoopCarousel from './carousel/LoopCarousel.svelte';
import TestCarousel from './carousel/TestCarousel.svelte';

test('labels the carousel, renders controls, and preserves page-change details and direction', async () => {
  const pages: number[] = [];
  const { rerender } = render(TestCarousel, {
    props: {
      dir: 'rtl',
      onPageChange: (details: { page: number }) => pages.push(details.page),
    },
  });

  await expect
    .element(page.getByRole('region', { name: 'Travel gallery' }))
    .toHaveAttribute('aria-roledescription', 'carousel');
  await expect.element(page.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
  await expect.element(page.getByRole('button', { name: 'Next slide' })).toBeEnabled();
  await expect.element(page.getByRole('button', { name: 'Go to slide 1' })).toBeAttached();
  await expect.element(page.getByRole('button', { name: 'Go to slide 2' })).toBeAttached();
  await expect.element(page.getByText('1 / 2')).toBeAttached();

  await page.getByRole('button', { name: 'Next slide' }).click();

  await expect
    .element(page.getByRole('region', { name: 'Travel gallery' }))
    .toHaveAttribute('dir', 'rtl');
  await expect.poll(() => pages).toEqual([1]);

  await rerender({ dir: 'ltr' });
  await expect
    .element(page.getByRole('region', { name: 'Travel gallery' }))
    .toHaveAttribute('dir', 'ltr');
  await expect.element(page.getByText('2 / 2')).toBeAttached();
});

test('applies the bare loop attribute through Ark Boolean casting and wraps pages', async () => {
  const pages: number[] = [];
  render(LoopCarousel, { props: { onPageChange: (details) => pages.push(details.page) } });

  await page.getByRole('button', { name: 'Next slide' }).click();
  await expect.poll(() => pages).toEqual([1]);

  await page.getByRole('button', { name: 'Next slide' }).click();
  await expect.poll(() => pages).toEqual([1, 0]);
});

test('preserves refs, asChild composition, and generated indicator styling hooks', async () => {
  const { component, container } = render(ComposedCarousel);

  const root = container.querySelector('[data-testid="composed-carousel"]')!;
  const previous = page.getByRole('button', { name: 'Previous slide' });
  const indicatorGroup = root.querySelector('[data-slot="carousel-indicator-group"]');

  expect(root.tagName).toBe('SECTION');
  expect(root.getAttribute('data-slot')).toBe('carousel-root');
  expect(component.getRefs().rootRef).toBe(root);
  await expect.element(previous).toHaveText('Back');
  await expect.element(previous).toBeDisabled();
  expect(indicatorGroup).not.toBeNull();
  expect(component.getRefs().indicatorsRef).toBe(indicatorGroup);
  expect(indicatorGroup?.querySelectorAll('.generated-indicator')).toHaveLength(2);
});

test('grows the autoplay trigger with its label and forwards the fallback snippet', async () => {
  render(AutoplayCarousel);

  await expect.element(page.getByText('Start slideshow')).toBeAttached();
});