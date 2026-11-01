import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import type { CSSProperties } from 'react';
import { Spinner } from '@/index';

test('renders the default status with stable styling hooks', async () => {
  expect(Spinner).not.toHaveProperty('Root');
  render(
    <Spinner
      aria-label="Syncing files"
      data-part="custom"
      data-slot="custom"
      data-scope="custom"
      data-size="custom"
      role="alert"
    />,
  );

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
  expect(spinner.querySelector('[data-slot="spinner-ring"]')).toBeTruthy();
});

test('applies the size variable to every size except inherit', async () => {
  render(
    <>
      <Spinner decorative size="lg" data-testid="lg" />
      <div style={{ '--moduix-spinner-size': '40px', fontSize: '10px' } as CSSProperties}>
        <Spinner decorative size="xs" data-testid="xs" />
        <Spinner decorative size="inherit" data-testid="inherit" />
      </div>
    </>,
  );

  await expect.element(page.getByTestId('lg')).toHaveCSS('width', '28px');
  await expect.element(page.getByTestId('xs')).toHaveCSS('width', '40px');
  await expect.element(page.getByTestId('inherit')).toHaveCSS('width', '10px');
});