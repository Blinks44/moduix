import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Spinner } from '../src';

test('renders the default status with stable styling hooks', () => {
  render(() => (
    <Spinner
      aria-label="Syncing files"
      data-part="custom"
      data-slot="custom"
      data-scope="custom"
      data-size="custom"
      role="alert"
    />
  ));

  const spinner = screen.getByRole('status', { name: 'Syncing files' });

  expect(spinner).toHaveAttribute('data-scope', 'spinner');
  expect(spinner).toHaveAttribute('data-part', 'root');
  expect(spinner).toHaveAttribute('data-slot', 'spinner-root');
  expect(spinner).toHaveAttribute('data-size', 'md');
  expect(spinner.querySelector('[data-slot="spinner-indicator"]')).toHaveAttribute(
    'aria-hidden',
    'true',
  );
  expect(spinner.querySelector('[data-slot="spinner-ring"]')).toBeTruthy();
});

test('uses the inherited font size when requested', () => {
  render(() => <Spinner decorative size="inherit" data-testid="spinner" />);

  expect(screen.getByTestId('spinner')).toHaveAttribute('data-size', 'inherit');
});

test('keeps decorative default spinners out of the accessibility tree', () => {
  render(() => <Spinner decorative data-testid="spinner" />);

  const spinner = screen.getByTestId('spinner');

  expect(spinner).toHaveAttribute('role', 'presentation');
  expect(spinner).toHaveAttribute('aria-hidden', 'true');
});

test('uses an external label instead of the default accessible name', () => {
  render(() => (
    <>
      <span id="spinner-label">Syncing files</span>
      <Spinner aria-labelledby="spinner-label" />
    </>
  ));

  const spinner = screen.getByRole('status', { name: 'Syncing files' });

  expect(spinner).toHaveAttribute('aria-labelledby', 'spinner-label');
  expect(spinner).not.toHaveAttribute('aria-label');
});

test('preserves a custom host and its semantics with decorative asChild composition', () => {
  render(() => (
    <Spinner
      decorative
      asChild={(props) => (
        <button {...props()} type="button">
          Refresh
        </button>
      )}
    />
  ));

  const button = screen.getByRole('button', { name: 'Refresh' });

  expect(button).not.toHaveAttribute('aria-hidden');
  expect(button).not.toHaveAttribute('role');
  expect(button).toHaveAttribute('data-slot', 'spinner-root');
});

test('forwards status semantics to a non-decorative asChild host', () => {
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

  const spinner = screen.getByRole('status', { name: 'Loading report' });

  expect(spinner).toHaveAttribute('data-size', 'lg');
  expect(spinner).toHaveAttribute('data-slot', 'spinner-root');
});

test('keeps custom indicator content inside the hidden rotating wrapper', () => {
  render(() => (
    <Spinner aria-label="Syncing">
      <svg aria-hidden="true" data-testid="custom-indicator" />
    </Spinner>
  ));

  const spinner = screen.getByRole('status', { name: 'Syncing' });

  expect(spinner.querySelector('[data-slot="spinner-ring"]')).toBeNull();
  expect(screen.getByTestId('custom-indicator').parentElement).toHaveAttribute(
    'data-slot',
    'spinner-indicator',
  );
});