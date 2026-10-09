import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { CloseButton } from '../src';

test('supports bound click handlers and still blocks disabled activation', async () => {
  const payload = { action: 'dismiss' };
  const calls: unknown[] = [];
  const [disabled, setDisabled] = createSignal(false);
  render(() => (
    <CloseButton
      aria-disabled={disabled()}
      onClick={[
        (data, event) => {
          calls.push(data, event.currentTarget);
        },
        payload,
      ]}
    />
  ));
  const button = screen.getByRole('button', { name: 'Close' });
  await page.getByRole('button', { name: 'Close' }).click();
  expect(calls).toEqual([payload, button]);
  setDisabled(true);
  expect(button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
    false,
  );
  expect(calls).toHaveLength(2);
});

test('renders an accessible native button with safe defaults and a forwarded ref', async () => {
  let ref!: HTMLButtonElement;

  render(() => <CloseButton ref={(element) => (ref = element)} data-testid="close-button" />);

  const button = screen.getByTestId('close-button');
  const icon = button.querySelector('svg');

  expect(ref).toBe(button);
  await expect.element(page.getByTestId('close-button')).toHaveAttribute('type', 'button');
  expect(screen.getByRole('button', { name: 'Close' })).toBe(button);
  expect([...icon!.classList]).toEqual(expect.arrayContaining(['size-4', 'shrink-0']));
  expect([...button!.classList]).toEqual(
    expect.arrayContaining(['size-7', 'rounded-sm', 'bg-transparent', 'text-muted-foreground']),
  );
  for (const utility of [
    'transition-[background-color,color,opacity,translate,scale]',
    'motion-safe:[&:active:not([data-disabled])]:translate-y-px',
    'motion-safe:[&:active:not([data-disabled])]:scale-[0.985]',
  ]) {
    expect(button!.classList.contains(utility)).toBe(false);
  }
  expect(button.dataset).toMatchObject({
    scope: 'close-button',
    part: 'root',
    slot: 'close-button-root',
  });
});

test('keeps the close fallback for conditional children', () => {
  render(() => <CloseButton>{false}</CloseButton>);

  const button = screen.getByRole('button', { name: 'Close' });

  expect(button.querySelector('svg')).not.toBeNull();
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

test('keeps disabled asChild hosts semantic and prevents their activation', async () => {
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

  const close = page.getByRole('button', { name: 'Close documentation' });

  await expect.element(close).not.toHaveAttribute('disabled');
  await expect.element(close).toHaveAttribute('aria-disabled', 'true');
  await expect.element(close).toHaveAttribute('data-disabled');
  expect([...button!.classList]).toEqual(
    expect.arrayContaining(['data-disabled:pointer-events-none', 'data-disabled:opacity-50']),
  );
  expect(button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
    false,
  );
  expect(childClickCount).toBe(0);
  expect(closeClickCount).toBe(0);
});

test('preserves custom button hosts and composed click handlers', async () => {
  const calls: string[] = [];

  render(() => (
    <CloseButton
      asChild={(props) => (
        <button
          {...props({ onClick: () => calls.push('button click') })}
          type="button"
          data-owner="consumer"
        >
          Dismiss notification
        </button>
      )}
      aria-label="Dismiss notification"
      onClickCapture={() => calls.push('close capture')}
      onClick={() => calls.push('close click')}
    />
  ));

  const button = screen.getByRole('button', { name: 'Dismiss notification' });
  expect(button.getAttribute('type')).toBe('button');
  expect(button.dataset).toMatchObject({ owner: 'consumer', slot: 'close-button-root' });

  await page.getByRole('button', { name: 'Dismiss notification' }).click();

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

  await expect.element(page.getByRole('button', { name: 'Close' })).toBeDisabled();
  expect(clickCount).toBe(0);

  setDisabled(undefined);
  setAriaDisabled('true');

  const button = screen.getByRole('button', { name: 'Close' });

  await expect
    .element(page.getByRole('button', { name: 'Close' }))
    .toHaveAttribute('data-disabled');
  expect(button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
    false,
  );
  expect(clickCount).toBe(0);
});

test('preserves composed data hooks', async () => {
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

  expect(button.dataset).toMatchObject({
    scope: 'accordion',
    part: 'trigger',
    slot: 'accordion-trigger',
  });
  await expect
    .element(page.getByRole('button', { name: 'Delete item' }))
    .toHaveAttribute('data-disabled');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(() => (
    <CloseButton
      class="size-10 rounded-full bg-primary text-primary-foreground"
      data-testid="close-button"
    />
  ));

  const button = screen.getByTestId('close-button');

  expect([...button!.classList]).toEqual(
    expect.arrayContaining(['size-10', 'rounded-full', 'bg-primary', 'text-primary-foreground']),
  );
  for (const utility of ['size-7', 'rounded-sm', 'bg-transparent', 'text-muted-foreground']) {
    expect(button!.classList.contains(utility)).toBe(false);
  }
});