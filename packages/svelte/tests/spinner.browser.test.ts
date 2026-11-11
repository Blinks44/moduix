import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildSpinner from './spinner/AsChildSpinner.svelte';
import DynamicSpinner from './spinner/DynamicSpinner.svelte';
import IndicatorSpinner from './spinner/IndicatorSpinner.svelte';

test.each([false, true])(
  'updates accessible names and decorative semantics on the same host (asChild=%s)',
  async (asChild) => {
    const { rerender } = render(DynamicSpinner, {
      props: { asChild, 'aria-label': 'Syncing', 'data-testid': 'spinner' },
    });
    await expect.element(page.getByRole('status', { name: 'Syncing' })).toHaveCount(1);
    const host = screen.getByRole('status', { name: 'Syncing' });
    await rerender({ 'aria-label': 'Processing' });
    await expect.element(page.getByRole('status', { name: 'Processing' })).toHaveCount(1);
    await rerender({ 'aria-label': undefined, 'aria-labelledby': 'progress-label' });
    await expect.element(page.getByRole('status', { name: 'Uploading' })).toHaveCount(1);
    expect(host.hasAttribute('aria-label')).toBe(false);
    await rerender({ decorative: true });
    expect(host.hasAttribute('aria-label')).toBe(false);
    expect(host.hasAttribute('role')).toBe(false);
    expect(host.getAttribute('aria-hidden')).toBe('true');
    await rerender({ decorative: false, 'aria-labelledby': undefined });
    expect(screen.getByRole('status', { name: 'Loading' })).toBe(host);
  },
);

test('keeps decorative default spinners out of the accessibility tree', async () => {
  render(DynamicSpinner, {
    props: { decorative: true, size: 'inherit', 'data-testid': 'spinner' },
  });

  await expect.element(page.getByTestId('spinner')).toHaveCount(1);
  const spinner = screen.getByTestId('spinner');

  expect(spinner.getAttribute('data-size')).toBe('inherit');
  expect(spinner.hasAttribute('role')).toBe(false);
  expect(spinner.getAttribute('aria-hidden')).toBe('true');
});

test('uses an external label instead of the default accessible name', async () => {
  render(DynamicSpinner, { props: { 'aria-labelledby': 'progress-label' } });

  await expect.element(page.getByRole('status', { name: 'Uploading' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Uploading' });

  expect(spinner.getAttribute('aria-labelledby')).toBe('progress-label');
  expect(spinner.hasAttribute('aria-label')).toBe(false);
});

test('hides a decorative asChild host from assistive technology', async () => {
  const { component } = render(AsChildSpinner, { props: { decorative: true } });

  await expect.element(page.getByTestId('spinner-host')).toHaveCount(1);
  const host = screen.getByTestId('spinner-host');

  expect(component.getRef()).toBe(host);
  expect(host.getAttribute('aria-hidden')).toBe('true');
  expect(host.hasAttribute('role')).toBe(false);
  expect(host.hasAttribute('aria-label')).toBe(false);
  expect(host.getAttribute('data-slot')).toBe('spinner-root');
});

test('forwards status semantics and the ref to a non-decorative asChild host', async () => {
  const { component } = render(AsChildSpinner);

  await expect.element(page.getByRole('status', { name: 'Loading report' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Loading report' });

  expect(component.getRef()).toBe(spinner);
  expect(spinner.dataset).toMatchObject({
    size: 'lg',
    slot: 'spinner-root',
  });
});

test('keeps custom indicator content inside the hidden rotating wrapper', async () => {
  render(IndicatorSpinner);

  await expect.element(page.getByRole('status', { name: 'Syncing' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Syncing' });

  expect(spinner.querySelector('[data-slot="spinner-ring"]')).toBeNull();
  expect(screen.getByTestId('custom-indicator').parentElement?.getAttribute('data-slot')).toBe(
    'spinner-indicator',
  );
});