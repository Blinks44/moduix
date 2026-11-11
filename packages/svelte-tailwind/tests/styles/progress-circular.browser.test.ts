import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import ProgressCircularCustom from './ProgressCircularCustom.svelte';
import ProgressCircularOverride from './ProgressCircularOverride.svelte';

test('synchronizes custom circular composition with controlled values and state views', async () => {
  render(ProgressCircularCustom);

  const progressbar = screen.getByRole('progressbar', { name: 'Processed 10 of 30' });
  const progressbarLocator = page.getByRole('progressbar');
  await expect.element(progressbarLocator).toHaveAttribute('aria-valuemin', '10');
  await expect.element(progressbarLocator).toHaveAttribute('aria-valuemax', '30');
  await expect.element(progressbarLocator).toHaveAttribute('aria-valuenow', '10');
  await expect.element(progressbarLocator).toHaveAttribute('data-state', 'loading');
  await expect.element(page.getByText('Import in progress')).toBeVisible();
  await expect.element(page.getByText('Import complete')).not.toBeVisible();

  await page.getByRole('button', { name: 'Complete import' }).click();

  await expect.element(progressbarLocator).toHaveAttribute('aria-valuenow', '30');
  await expect.element(progressbarLocator).toHaveAttribute('data-state', 'complete');
  expect(screen.getByRole('progressbar', { name: 'Processed 30 of 30' })).toBe(progressbar);
  await expect.element(page.getByText('Import in progress')).not.toBeVisible();
  await expect.element(page.getByText('Import complete')).toBeVisible();
});

test('preserves consumer classes on every styled part', () => {
  render(ProgressCircularOverride);

  expect(screen.getByTestId('progress-root').classList.contains('w-80')).toBe(true);
  expect(screen.getByText('Export data').classList.contains('text-lg')).toBe(true);
  expect(screen.getByText('42%').classList.contains('text-xl')).toBe(true);
  expect(
    screen.getByRole('progressbar', { name: 'Export data' }).classList.contains('[--size:10rem]'),
  ).toBe(true);
});