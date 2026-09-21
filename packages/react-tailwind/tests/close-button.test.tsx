import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { CloseButton } from '../src';

test('renders an accessible native button with safe defaults and a forwarded ref', () => {
  const ref = createRef<HTMLButtonElement>();

  render(<CloseButton ref={ref} data-testid="close-button" />);

  const button = screen.getByTestId('close-button');
  const icon = button.querySelector('svg');

  expect(ref.current).toBe(button);
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAccessibleName('Close');
  expect(icon).toHaveClass('size-3', 'shrink-0');
  expect(button).toHaveClass('size-7', 'rounded-sm', 'bg-transparent', 'text-muted-foreground');
  expect(button).not.toHaveClass(
    'transition-[background-color,color,opacity,translate,scale]',
    'motion-safe:[&:active:not([data-disabled])]:translate-y-px',
    'motion-safe:[&:active:not([data-disabled])]:scale-[0.985]',
  );
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
  expect(button).toHaveClass('data-disabled:pointer-events-none', 'data-disabled:opacity-50');
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

test('preserves composed data hooks', () => {
  render(
    <CloseButton
      aria-label="Delete item"
      data-scope="accordion"
      data-part="trigger"
      data-slot="accordion-trigger"
      data-disabled=""
    />,
  );

  const button = screen.getByRole('button', { name: 'Delete item' });

  expect(button).toHaveAttribute('data-scope', 'accordion');
  expect(button).toHaveAttribute('data-part', 'trigger');
  expect(button).toHaveAttribute('data-slot', 'accordion-trigger');
  expect(button).toHaveAttribute('data-disabled');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <CloseButton
      className="size-10 rounded-full bg-primary text-primary-foreground"
      data-testid="close-button"
    />,
  );

  const button = screen.getByTestId('close-button');

  expect(button).toHaveClass('size-10', 'rounded-full', 'bg-primary', 'text-primary-foreground');
  expect(button).not.toHaveClass('size-7', 'rounded-sm', 'bg-transparent', 'text-muted-foreground');
});