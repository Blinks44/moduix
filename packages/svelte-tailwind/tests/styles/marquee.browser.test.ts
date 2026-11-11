import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import MarqueeOverride from './MarqueeOverride.svelte';

test('lets consumer Tailwind utilities override conflicting defaults', () => {
  render(MarqueeOverride, { props: { mode: 'horizontal' } });

  const root = screen.getByRole('region', { name: 'Partner logos' });
  const edge = screen.getByTestId('edge');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-1/2', 'text-primary']));
  expect([...edge!.classList]).toEqual(expect.arrayContaining(['w-1/4']));
  expect(root.getBoundingClientRect().width).toBeGreaterThan(0);
  expect(root.getBoundingClientRect().width).toBeCloseTo(
    root.parentElement!.getBoundingClientRect().width / 2,
  );
  expect(edge.getBoundingClientRect().width).toBeCloseTo(root.getBoundingClientRect().width / 4);
});

test('lets consumers override the vertical height', async () => {
  render(MarqueeOverride, { props: { mode: 'vertical' } });

  const root = screen.getByRole('region');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['h-96']));
  await expect.element(page.locator('[data-slot="marquee-root"]')).toHaveCSS('height', '384px');
});