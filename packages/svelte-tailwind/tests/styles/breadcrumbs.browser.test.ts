import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import BreadcrumbsOverride from './BreadcrumbsOverride.svelte';

test('merges consumer Tailwind classes after component defaults', () => {
  render(BreadcrumbsOverride);

  const navigation = screen.getByRole('navigation');
  const list = screen.getByRole('list');
  expect(navigation.classList.contains('text-red-500')).toBe(true);
  expect(list.classList.contains('gap-4')).toBe(true);
});