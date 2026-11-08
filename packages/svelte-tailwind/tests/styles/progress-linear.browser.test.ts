import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import ProgressLinearOverride from './ProgressLinearOverride.svelte';

test('lets consumer utilities override defaults on each styled part', () => {
  render(ProgressLinearOverride);

  const root = screen.getByTestId('progress-root');
  const track = screen.getByRole('progressbar', { name: 'Export data' });
  const range = track.querySelector('[data-part="range"]')!;

  expect(root.classList.contains('w-80')).toBe(true);
  expect(track.classList.contains('h-4')).toBe(true);
  expect(range.classList.contains('bg-accent')).toBe(true);
});