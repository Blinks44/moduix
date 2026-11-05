import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AlertOverride from './AlertOverride.svelte';

test('applies status semantics and stable data hooks', async () => {
  const { container } = render(AlertOverride);

  await expect.element(page.getByRole('status')).toHaveCount(1);
  const statusAlert = screen.getByRole('status');
  const errorAlert = screen.getByRole('alert');
  expect(statusAlert.id).toBe('storage-alert');
  expect(statusAlert.getAttribute('data-probe')).toBe('root');
  expect(statusAlert.classList.contains('consumer-class')).toBe(true);

  expect(statusAlert.dataset).toMatchObject({
    scope: 'alert',
    part: 'root',
    slot: 'alert-root',
    status: 'info',
  });
  expect(errorAlert.getAttribute('data-status')).toBe('error');
  expect(container.querySelector('[data-part="indicator"]')?.getAttribute('aria-hidden')).toBe(
    'true',
  );
});

test('lets consumer utilities override default classes', async () => {
  render(AlertOverride);

  await expect.element(page.getByTestId('width-alert')).toHaveCount(1);

  expect(screen.getByTestId('width-alert').classList.contains('w-auto')).toBe(true);
});

test('lets a consumer color utility override the status indicator color', async () => {
  render(AlertOverride);

  await expect.element(page.getByTestId('custom-indicator')).toHaveCount(1);
  const reference = getComputedStyle(screen.getByTestId('reference')).color;

  expect(getComputedStyle(screen.getByTestId('status-indicator')).color).not.toBe(reference);
  expect(getComputedStyle(screen.getByTestId('custom-indicator')).color).toBe(reference);
});

test('lets a size utility on the icon resize the icon and the indicator', async () => {
  render(AlertOverride);

  await expect.element(page.getByTestId('default-icon')).toHaveCount(1);

  expect(screen.getByTestId('default-icon').getBoundingClientRect().width).toBe(16);
  expect(screen.getByTestId('custom-icon').getBoundingClientRect().width).toBe(24);
  expect(screen.getByTestId('custom-icon').parentElement?.offsetWidth).toBe(24);
  expect(screen.getByTestId('custom-icon').parentElement?.offsetHeight).toBe(24);
});