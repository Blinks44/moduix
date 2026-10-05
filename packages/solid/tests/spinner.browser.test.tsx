import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Spinner } from '../src';

test('renders the default status with stable styling hooks', async () => {
  expect(Spinner).not.toHaveProperty('Root');
  let rootRef!: HTMLSpanElement;
  render(() => (
    <Spinner
      ref={(element) => (rootRef = element)}
      aria-label="Syncing files"
      data-part="custom"
      data-slot="custom"
      data-scope="custom"
      data-size="custom"
      role="alert"
    />
  ));

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
  expect(rootRef).toBe(spinner);
});

test('keeps decorative default spinners out of the accessibility tree', async () => {
  render(() => <Spinner decorative size="inherit" data-testid="spinner" />);

  await expect.element(page.getByTestId('spinner')).toHaveCount(1);
  const spinner = screen.getByTestId('spinner');

  expect(spinner.getAttribute('data-size')).toBe('inherit');
  expect(spinner.getAttribute('role')).toBe('presentation');
  expect(spinner.getAttribute('aria-hidden')).toBe('true');
});

test('uses an external label instead of the default accessible name', async () => {
  render(() => (
    <>
      <span id="spinner-label">Syncing files</span>
      <Spinner aria-labelledby="spinner-label" />
    </>
  ));

  await expect.element(page.getByRole('status', { name: 'Syncing files' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Syncing files' });

  expect(spinner.getAttribute('aria-labelledby')).toBe('spinner-label');
  expect(spinner.hasAttribute('aria-label')).toBe(false);
});

test('preserves a decorative custom host and the Ark Solid ref limitation', async () => {
  let customRef: HTMLSpanElement | undefined;
  render(() => (
    <Spinner
      decorative
      ref={(element) => (customRef = element)}
      asChild={(props) => (
        <button {...props()} type="button">
          Refresh
        </button>
      )}
    />
  ));

  await expect.element(page.getByRole('button', { name: 'Refresh' })).toHaveCount(1);
  const button = screen.getByRole('button', { name: 'Refresh' });

  expect(customRef).toBeUndefined();
  expect(button.hasAttribute('aria-hidden')).toBe(false);
  expect(button.hasAttribute('role')).toBe(false);
  expect(button.getAttribute('data-slot')).toBe('spinner-root');
});

test('forwards status semantics to a non-decorative asChild host', async () => {
  render(() => (
    <Spinner
      size="lg"
      aria-label="Loading report"
      asChild={(props) => (
        <span {...props()}>
          <span data-scope="spinner" data-part="indicator" data-slot="spinner-indicator">
            <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" />
          </span>
        </span>
      )}
    />
  ));

  await expect.element(page.getByRole('status', { name: 'Loading report' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Loading report' });

  expect(spinner.dataset).toMatchObject({
    size: 'lg',
    slot: 'spinner-root',
  });
});

test('keeps custom indicator content inside the hidden rotating wrapper', async () => {
  render(() => (
    <Spinner aria-label="Syncing">
      <svg aria-hidden="true" data-testid="custom-indicator" />
    </Spinner>
  ));

  await expect.element(page.getByRole('status', { name: 'Syncing' })).toHaveCount(1);
  const spinner = screen.getByRole('status', { name: 'Syncing' });

  expect(spinner.querySelector('[data-slot="spinner-ring"]')).toBeNull();
  expect(screen.getByTestId('custom-indicator').parentElement?.getAttribute('data-slot')).toBe(
    'spinner-indicator',
  );
});