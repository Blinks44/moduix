import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Spinner } from '../src';

test('renders the default status with stable styling hooks', () => {
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
  render(<Spinner decorative size="inherit" data-testid="spinner" />);

  expect(screen.getByTestId('spinner')).toHaveAttribute('data-size', 'inherit');
});

test('keeps decorative default spinners out of the accessibility tree', () => {
  render(<Spinner decorative data-testid="spinner" />);

  const spinner = screen.getByTestId('spinner');

  expect(spinner).toHaveAttribute('role', 'presentation');
  expect(spinner).toHaveAttribute('aria-hidden', 'true');
});

test('uses an external label instead of the default accessible name', () => {
  render(
    <>
      <span id="spinner-label">Syncing files</span>
      <Spinner aria-labelledby="spinner-label" />
    </>,
  );

  const spinner = screen.getByRole('status', { name: 'Syncing files' });

  expect(spinner).toHaveAttribute('aria-labelledby', 'spinner-label');
  expect(spinner).not.toHaveAttribute('aria-label');
});

test('preserves a custom host and its semantics with decorative asChild composition', () => {
  const ref = createRef<HTMLButtonElement>();

  render(
    <Spinner decorative asChild ref={ref}>
      <button type="button">Refresh</button>
    </Spinner>,
  );

  const button = screen.getByRole('button', { name: 'Refresh' });

  expect(ref.current).toBe(button);
  expect(button).not.toHaveAttribute('aria-hidden');
  expect(button).not.toHaveAttribute('role');
  expect(button).toHaveAttribute('data-slot', 'spinner-root');
});

test('forwards status semantics and the ref to a non-decorative asChild host', () => {
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

  const spinner = screen.getByRole('status', { name: 'Loading report' });

  expect(ref.current).toBe(spinner);
  expect(spinner).toHaveAttribute('data-size', 'lg');
  expect(spinner).toHaveAttribute('data-slot', 'spinner-root');
});

test('keeps custom indicator content inside the hidden rotating wrapper', () => {
  render(
    <Spinner aria-label="Syncing">
      <svg aria-hidden="true" data-testid="custom-indicator" />
    </Spinner>,
  );

  const spinner = screen.getByRole('status', { name: 'Syncing' });

  expect(spinner.querySelector('[data-slot="spinner-ring"]')).toBeNull();
  expect(screen.getByTestId('custom-indicator').parentElement).toHaveAttribute(
    'data-slot',
    'spinner-indicator',
  );
});