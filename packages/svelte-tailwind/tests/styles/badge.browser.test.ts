import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import BadgeOverride from './BadgeOverride.svelte';

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(BadgeOverride);

  await expect.element(page.getByTestId('badge')).toHaveCount(1);

  await expect.element(page.getByTestId('badge')).toHaveCSS('padding', '0px');
});

test('lets a size utility on an icon override the default icon size', () => {
  render(BadgeOverride);

  expect(screen.getByTestId('icon').getBoundingClientRect().width).toBe(16);
});