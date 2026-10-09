import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { CloseButton } from '../src';

test('renders an accessible native button with safe defaults and a forwarded ref', async () => {
  const ref = createRef<HTMLButtonElement>();

  render(<CloseButton ref={ref} data-testid="close-button" />);

  const button = screen.getByTestId('close-button');

  expect(ref.current).toBe(button);
  await expect.element(page.getByTestId('close-button')).toHaveAttribute('type', 'button');
  expect(screen.getByRole('button', { name: 'Close' })).toBe(button);
  expect(button.querySelector('svg')).not.toBeNull();
  expect(button.dataset).toMatchObject({
    scope: 'close-button',
    part: 'root',
    slot: 'close-button-root',
  });
});

test('keeps the close fallback for conditional children', () => {
  render(<CloseButton>{false}</CloseButton>);

  const button = screen.getByRole('button', { name: 'Close' });

  expect(button.querySelector('svg')).not.toBeNull();
});

test('keeps disabled asChild hosts semantic and prevents their activation', async () => {
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

  const close = page.getByRole('button', { name: 'Close documentation' });

  await expect.element(close).not.toHaveAttribute('disabled');
  await expect.element(close).toHaveAttribute('aria-disabled', 'true');
  await expect.element(close).toHaveAttribute('data-disabled');
  expect(button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
    false,
  );
  expect(handleChildClick).not.toHaveBeenCalled();
  expect(handleCloseClick).not.toHaveBeenCalled();
});

test('preserves custom button hosts and composed click handlers', async () => {
  const calls: string[] = [];

  render(
    <CloseButton
      asChild
      aria-label="Dismiss notification"
      onClickCapture={() => calls.push('close capture')}
      onClick={() => calls.push('close click')}
    >
      <button type="button" data-owner="consumer" onClick={() => calls.push('button click')}>
        Dismiss notification
      </button>
    </CloseButton>,
  );

  const button = screen.getByRole('button', { name: 'Dismiss notification' });
  expect(button.getAttribute('type')).toBe('button');
  expect(button.dataset).toMatchObject({ owner: 'consumer', slot: 'close-button-root' });

  await page.getByRole('button', { name: 'Dismiss notification' }).click();

  expect(calls).toEqual(['close capture', 'button click', 'close click']);
});

test('prevents activation for native and aria-disabled buttons', async () => {
  const handleClick = rs.fn();

  const { rerender } = render(<CloseButton disabled onClick={handleClick} />);

  await expect.element(page.getByRole('button', { name: 'Close' })).toBeDisabled();
  expect(handleClick).not.toHaveBeenCalled();

  rerender(<CloseButton aria-disabled="true" onClick={handleClick} />);

  const button = screen.getByRole('button', { name: 'Close' });

  await expect
    .element(page.getByRole('button', { name: 'Close' }))
    .toHaveAttribute('data-disabled');
  expect(button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
    false,
  );
  expect(handleClick).not.toHaveBeenCalled();
});