import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import * as spinnerExports from '@/components/spinner';
// The shared harness resolves `@/` to this package's source.
import DynamicSpinner from '../../../svelte/tests/spinner/DynamicSpinner.svelte';

test('renders the default status with stable styling hooks', async () => {
  expect(spinnerExports).not.toHaveProperty('SpinnerRoot');
  render(DynamicSpinner, {
    props: {
      'aria-label': 'Syncing files',
      'data-part': 'custom',
      'data-slot': 'custom',
      'data-scope': 'custom',
      'data-size': 'custom',
      role: 'alert',
    },
  });

  await expect.element(page.getByRole('status', { name: 'Syncing files' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Syncing files' });

  expect(spinner.dataset).toMatchObject({
    scope: 'spinner',
    part: 'root',
    slot: 'spinner-root',
    size: 'md',
  });
  expect(
    spinner.querySelector('[data-slot="spinner-indicator"]')?.getAttribute('aria-hidden'),
  ).toBe('true');
});

test('lets a consumer class override the selected size utility', async () => {
  render(DynamicSpinner, {
    props: { decorative: true, size: 'lg', class: 'size-10', 'data-testid': 'spinner' },
  });

  expect(screen.getByTestId('spinner').classList.contains('size-10')).toBe(true);
  await expect.element(page.getByTestId('spinner')).toHaveCSS('width', '40px');
  await expect.element(page.getByTestId('spinner')).toHaveCSS('height', '40px');
});