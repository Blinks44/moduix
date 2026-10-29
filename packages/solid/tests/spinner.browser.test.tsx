import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Spinner } from '@/index';

test('keeps decorative default spinners out of the accessibility tree', async () => {
  render(() => <Spinner decorative size="inherit" data-testid="spinner" />);

  await expect.element(page.getByTestId('spinner')).toHaveCount(1);
  const spinner = screen.getByTestId('spinner');

  expect(spinner.getAttribute('data-size')).toBe('inherit');
  expect(spinner.hasAttribute('role')).toBe(false);
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

test('hides a decorative custom host and keeps the Ark Solid ref limitation', async () => {
  let customRef: HTMLSpanElement | undefined;
  render(() => (
    <Spinner
      decorative
      ref={(element) => (customRef = element)}
      asChild={(props) => <span {...props()} data-testid="spinner-host" />}
    />
  ));

  await expect.element(page.getByTestId('spinner-host')).toHaveCount(1);
  const host = screen.getByTestId('spinner-host');

  expect(customRef).toBeUndefined();
  expect(host.querySelector('[data-slot="spinner-ring"]')).toBeTruthy();
  expect(host.getAttribute('aria-hidden')).toBe('true');
  expect(host.hasAttribute('role')).toBe(false);
  expect(host.hasAttribute('aria-label')).toBe(false);
  expect(host.getAttribute('data-slot')).toBe('spinner-root');
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