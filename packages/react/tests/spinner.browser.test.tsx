import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import type { CSSProperties } from 'react';
import { Spinner } from '../src';

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

test('keeps decorative default spinners out of the accessibility tree', async () => {
  render(<Spinner decorative size="inherit" data-testid="spinner" />);

  await expect.element(page.getByTestId('spinner')).toHaveCount(1);
  const spinner = screen.getByTestId('spinner');

  expect(spinner.getAttribute('data-size')).toBe('inherit');
  expect(spinner.hasAttribute('role')).toBe(false);
  expect(spinner.getAttribute('aria-hidden')).toBe('true');
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

test('uses an external label instead of the default accessible name', async () => {
  render(
    <>
      <span id="spinner-label">Syncing files</span>
      <Spinner aria-labelledby="spinner-label" />
    </>,
  );

  await expect.element(page.getByRole('status', { name: 'Syncing files' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Syncing files' });

  expect(spinner.getAttribute('aria-labelledby')).toBe('spinner-label');
  expect(spinner.hasAttribute('aria-label')).toBe(false);
});

test('hides a decorative asChild host from assistive technology', async () => {
  const ref = createRef<HTMLSpanElement>();

  render(
    <Spinner decorative asChild ref={ref}>
      <span data-testid="spinner-host" />
    </Spinner>,
  );

  await expect.element(page.getByTestId('spinner-host')).toHaveCount(1);
  const host = screen.getByTestId('spinner-host');

  expect(ref.current).toBe(host);
  expect(host.getAttribute('aria-hidden')).toBe('true');
  expect(host.hasAttribute('role')).toBe(false);
  expect(host.hasAttribute('aria-label')).toBe(false);
  expect(host.getAttribute('data-slot')).toBe('spinner-root');
});

test('forwards status semantics and the ref to a non-decorative asChild host', async () => {
  const ref = createRef<HTMLSpanElement>();

  render(
    <Spinner asChild ref={ref} size="lg" aria-label="Loading report">
      <span>
        <span data-scope="spinner" data-part="indicator" data-slot="spinner-indicator">
          <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" />
        </span>
      </span>
    </Spinner>,
  );

  await expect.element(page.getByRole('status', { name: 'Loading report' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Loading report' });

  expect(ref.current).toBe(spinner);
  expect(spinner.dataset).toMatchObject({
    size: 'lg',
    slot: 'spinner-root',
  });
});

test('keeps custom indicator content inside the hidden rotating wrapper', async () => {
  render(
    <Spinner aria-label="Syncing">
      <svg aria-hidden="true" data-testid="custom-indicator" />
    </Spinner>,
  );

  await expect.element(page.getByRole('status', { name: 'Syncing' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Syncing' });

  expect(spinner.querySelector('[data-slot="spinner-ring"]')).toBeNull();
  expect(screen.getByTestId('custom-indicator').parentElement?.getAttribute('data-slot')).toBe(
    'spinner-indicator',
  );
});