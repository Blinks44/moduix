import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Button } from '../src';

test('renders a native button with safe defaults, stable hooks, and a forwarded ref', () => {
  const ref = createRef<HTMLButtonElement>();

  render(
    <Button ref={ref} data-testid="button">
      Save changes
    </Button>,
  );

  const button = screen.getByTestId('button');

  expect(ref.current).toBe(button);
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAttribute('data-scope', 'button');
  expect(button).toHaveAttribute('data-part', 'root');
  expect(button).toHaveAttribute('data-slot', 'button-root');
  expect(button).toHaveAttribute('data-variant', 'default');
  expect(button).toHaveAttribute('data-size', 'md');
});

test('preserves semantic anchors with asChild', () => {
  const ref = createRef<HTMLButtonElement>();

  render(
    <Button ref={ref} asChild variant="outline">
      <a href="#docs">Read the docs</a>
    </Button>,
  );

  const link = screen.getByRole('link', { name: 'Read the docs' });

  expect(ref.current).toBe(link);
  expect(link).toHaveAttribute('href', '#docs');
  expect(link).not.toHaveAttribute('type');
  expect(link).toHaveAttribute('data-slot', 'button-root');
});

test('disables custom hosts accessibly and prevents activation', () => {
  render(
    <Button asChild disabled>
      <a href="#docs">Read the docs</a>
    </Button>,
  );

  const link = screen.getByRole('link', { name: 'Read the docs' });

  expect(link).toHaveAttribute('aria-disabled', 'true');
  expect(link).toHaveAttribute('data-disabled');
  expect(fireEvent.click(link)).toBe(false);
});

test('wires the loading state without taking over its content', () => {
  render(<Button loading>Saving</Button>);

  const button = screen.getByRole('button', { name: 'Saving' });

  expect(button).toBeDisabled();
  expect(button).toHaveAttribute('aria-busy', 'true');
  expect(button).toHaveAttribute('aria-disabled', 'true');
  expect(button).toHaveAttribute('data-disabled');
  expect(button).toHaveAttribute('data-loading');
});