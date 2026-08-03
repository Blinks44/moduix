import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { CloseButton } from '../src';

test('renders an accessible native button with safe defaults and a forwarded ref', () => {
  const ref = createRef<HTMLButtonElement>();

  render(<CloseButton ref={ref} data-testid="close-button" />);

  const button = screen.getByTestId('close-button');

  expect(ref.current).toBe(button);
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAccessibleName('Close');
  expect(button.querySelector('svg')).not.toBeNull();
  expect(button).toHaveAttribute('data-scope', 'close-button');
  expect(button).toHaveAttribute('data-part', 'root');
  expect(button).toHaveAttribute('data-slot', 'close-button-root');
});

test('keeps the close fallback for conditional children', () => {
  render(<CloseButton>{false}</CloseButton>);

  const button = screen.getByRole('button', { name: 'Close' });

  expect(button.querySelector('svg')).not.toBeNull();
});

test('preserves a semantic custom host with asChild', () => {
  render(
    <CloseButton asChild aria-label="Close documentation">
      <a href="#docs">
        <svg aria-hidden="true" />
      </a>
    </CloseButton>,
  );

  const link = screen.getByRole('link', { name: 'Close documentation' });

  expect(link).toHaveAttribute('href', '#docs');
  expect(link).not.toHaveAttribute('type');
  expect(link).toHaveAttribute('data-slot', 'close-button-root');
});

test('prevents activation for native and aria-disabled buttons', () => {
  const handleClick = rs.fn();

  const { rerender } = render(<CloseButton disabled onClick={handleClick} />);

  expect(screen.getByRole('button', { name: 'Close' })).toBeDisabled();
  expect(handleClick).not.toHaveBeenCalled();

  rerender(<CloseButton aria-disabled="true" onClick={handleClick} />);

  const button = screen.getByRole('button', { name: 'Close' });

  expect(button).toHaveAttribute('data-disabled');
  expect(fireEvent.click(button)).toBe(false);
  expect(handleClick).not.toHaveBeenCalled();
});