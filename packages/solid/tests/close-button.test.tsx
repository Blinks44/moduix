import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { CloseButton } from '../src';

test('renders an accessible native button with safe defaults and a forwarded ref', () => {
  let ref!: HTMLButtonElement;

  render(() => <CloseButton ref={(element) => (ref = element)} data-testid="close-button" />);

  const button = screen.getByTestId('close-button');

  expect(ref).toBe(button);
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAccessibleName('Close');
  expect(button.querySelector('svg')).not.toBeNull();
  expect(button).toHaveAttribute('data-scope', 'close-button');
  expect(button).toHaveAttribute('data-part', 'root');
  expect(button).toHaveAttribute('data-slot', 'close-button-root');
});

test('keeps the close fallback for conditional children', () => {
  render(() => <CloseButton>{false}</CloseButton>);

  const button = screen.getByRole('button', { name: 'Close' });

  expect(button.querySelector('svg')).not.toBeNull();
});

test('preserves an explicit custom button host with native Ark Solid asChild', () => {
  render(() => (
    <CloseButton
      asChild={(props) => (
        <button {...props()} type="button" data-owner="consumer">
          <svg aria-hidden="true" />
        </button>
      )}
      aria-label="Close documentation"
    />
  ));

  const button = screen.getByRole('button', { name: 'Close documentation' });

  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveAttribute('data-owner', 'consumer');
  expect(button).toHaveAttribute('data-slot', 'close-button-root');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let ref: HTMLButtonElement | undefined;

  render(() => (
    <CloseButton
      ref={(element) => (ref = element)}
      asChild={(props) => (
        <button {...props()} type="button">
          <svg aria-hidden="true" />
        </button>
      )}
      aria-label="Close documentation"
    />
  ));

  expect(ref).toBeUndefined();
});

test('keeps disabled asChild hosts semantic and prevents their activation', () => {
  let childClickCount = 0;
  let closeClickCount = 0;

  render(() => (
    <CloseButton
      asChild={(props) => (
        <button {...props({ onClick: () => childClickCount++ })} type="button">
          <svg aria-hidden="true" />
        </button>
      )}
      disabled
      aria-label="Close documentation"
      onClick={() => closeClickCount++}
    />
  ));

  const button = screen.getByRole('button', { name: 'Close documentation' });

  expect(button).not.toHaveAttribute('disabled');
  expect(button).toHaveAttribute('aria-disabled', 'true');
  expect(button).toHaveAttribute('data-disabled');
  expect(fireEvent.click(button)).toBe(false);
  expect(childClickCount).toBe(0);
  expect(closeClickCount).toBe(0);
});

test('preserves composed click handlers while enabled', () => {
  const calls: string[] = [];

  render(() => (
    <CloseButton
      asChild={(props) => (
        <button {...props({ onClick: () => calls.push('button click') })} type="button">
          Dismiss notification
        </button>
      )}
      aria-label="Dismiss notification"
      onClickCapture={() => calls.push('close capture')}
      onClick={() => calls.push('close click')}
    />
  ));

  fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));

  expect(calls).toEqual(['close capture', 'button click', 'close click']);
});

test('prevents activation for native and aria-disabled buttons', async () => {
  const [disabled, setDisabled] = createSignal<boolean | undefined>(true);
  const [ariaDisabled, setAriaDisabled] = createSignal<boolean | 'true' | undefined>();
  let clickCount = 0;

  render(() => (
    <CloseButton
      disabled={disabled()}
      aria-disabled={ariaDisabled()}
      onClick={() => clickCount++}
    />
  ));

  expect(screen.getByRole('button', { name: 'Close' })).toBeDisabled();
  expect(clickCount).toBe(0);

  setDisabled(undefined);
  setAriaDisabled('true');

  const button = screen.getByRole('button', { name: 'Close' });

  await waitFor(() => expect(button).toHaveAttribute('data-disabled'));
  expect(fireEvent.click(button)).toBe(false);
  expect(clickCount).toBe(0);
});

test('preserves composed data hooks', () => {
  render(() => (
    <CloseButton
      aria-label="Delete item"
      data-scope="accordion"
      data-part="trigger"
      data-slot="accordion-trigger"
      data-disabled=""
    />
  ));

  const button = screen.getByRole('button', { name: 'Delete item' });

  expect(button).toHaveAttribute('data-scope', 'accordion');
  expect(button).toHaveAttribute('data-part', 'trigger');
  expect(button).toHaveAttribute('data-slot', 'accordion-trigger');
  expect(button).toHaveAttribute('data-disabled');
});