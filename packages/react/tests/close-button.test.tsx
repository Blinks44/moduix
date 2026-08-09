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

test('preserves an explicit custom button host with asChild', () => {
  render(
    <CloseButton asChild aria-label="Close documentation">
      <button type="button" data-owner="consumer">
        <svg aria-hidden="true" />
      </button>
    </CloseButton>,
  );

  const button = screen.getByRole('button', { name: 'Close documentation' });

  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAttribute('data-owner', 'consumer');
  expect(button).toHaveAttribute('data-slot', 'close-button-root');
});

test('keeps disabled asChild hosts semantic and prevents their activation', () => {
  const handleChildClick = rs.fn();
  const handleCloseClick = rs.fn();

  render(
    <CloseButton asChild disabled aria-label="Close documentation" onClick={handleCloseClick}>
      <button type="button" onClick={handleChildClick}>
        <svg aria-hidden="true" />
      </button>
    </CloseButton>,
  );

  const button = screen.getByRole('button', { name: 'Close documentation' });

  expect(button).not.toHaveAttribute('disabled');
  expect(button).toHaveAttribute('aria-disabled', 'true');
  expect(button).toHaveAttribute('data-disabled');
  expect(fireEvent.click(button)).toBe(false);
  expect(handleChildClick).not.toHaveBeenCalled();
  expect(handleCloseClick).not.toHaveBeenCalled();
});

test('preserves composed click handlers while enabled', () => {
  const calls: string[] = [];

  render(
    <CloseButton
      asChild
      aria-label="Dismiss notification"
      onClickCapture={() => calls.push('close capture')}
      onClick={() => calls.push('close click')}
    >
      <button type="button" onClick={() => calls.push('button click')}>
        Dismiss notification
      </button>
    </CloseButton>,
  );

  fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));

  expect(calls).toEqual(['close capture', 'button click', 'close click']);
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