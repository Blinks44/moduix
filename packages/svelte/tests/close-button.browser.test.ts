import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { CloseButton } from '@/components/close-button';
import AsChildCloseButton from './close-button/AsChildCloseButton.svelte';
import LabelledCloseButton from './close-button/LabelledCloseButton.svelte';
import RefCloseButton from './close-button/RefCloseButton.svelte';

test('respects stopImmediatePropagation from a consumer capture listener', async () => {
  const handleClick = rs.fn();
  const handleChildClick = rs.fn();
  const handleCapture = rs.fn((event: MouseEvent) => event.stopImmediatePropagation());
  render(AsChildCloseButton, {
    props: {
      label: 'Stop propagation',
      childClick: handleChildClick,
      onclick: handleClick,
      onclickcapture: handleCapture,
    },
  });
  await page.getByRole('button', { name: 'Stop propagation' }).click();
  expect(handleCapture).toHaveBeenCalledTimes(1);
  expect(handleClick).not.toHaveBeenCalled();
  expect(handleChildClick).not.toHaveBeenCalled();
});

test('reacts to aria-disabled changes and blocks all same-host listeners while disabled', async () => {
  const handleClick = rs.fn();
  const handleCapture = rs.fn();
  const props = {
    label: 'Reactive disabled',
    onclick: handleClick,
    onclickcapture: handleCapture,
  };
  const { rerender } = render(AsChildCloseButton, { props });
  const button = screen.getByRole('button', { name: 'Reactive disabled' });
  const handleSameHostCapture = rs.fn();
  button.addEventListener('click', handleSameHostCapture, { capture: true });
  for (const value of [true, 'true'] as const) {
    await rerender({ ...props, 'aria-disabled': value });
    await expect
      .element(page.getByRole('button', { name: 'Reactive disabled' }))
      .toHaveAttribute('aria-disabled', 'true');
    await expect
      .element(page.getByRole('button', { name: 'Reactive disabled' }))
      .toHaveAttribute('data-disabled');
    expect(button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))).toBe(
      false,
    );
  }
  expect(handleClick).not.toHaveBeenCalled();
  expect(handleCapture).not.toHaveBeenCalled();
  expect(handleSameHostCapture).not.toHaveBeenCalled();

  for (const value of [false, 'false', undefined] as const) {
    await rerender({ ...props, 'aria-disabled': value });
    await expect
      .element(page.getByRole('button', { name: 'Reactive disabled' }))
      .not.toHaveAttribute('data-disabled');
    await page.getByRole('button', { name: 'Reactive disabled' }).click();
  }
  expect(handleClick).toHaveBeenCalledTimes(3);
  expect(handleCapture).toHaveBeenCalledTimes(3);
  expect(handleSameHostCapture).toHaveBeenCalledTimes(3);
});

test('renders an accessible native button with safe defaults and a Svelte ref', async () => {
  const { component } = render(RefCloseButton);

  const button = screen.getByTestId('close-button');

  expect(component.getRef()).toBe(button);
  await expect.element(page.getByTestId('close-button')).toHaveAttribute('type', 'button');
  expect(screen.getByRole('button', { name: 'Close' })).toBe(button);
  expect(button.querySelector('svg')).not.toBeNull();
  expect(button.dataset).toMatchObject({
    scope: 'close-button',
    part: 'root',
    slot: 'close-button-root',
  });
});

test('preserves a custom button host, attributes, and its DOM root through a Svelte ref', async () => {
  const { component } = render(AsChildCloseButton, {
    props: { label: 'Close documentation' },
  });

  const button = screen.getByRole('button', { name: 'Close documentation' });

  expect(component.getRef()).toBe(button);
  await expect
    .element(page.getByRole('button', { name: 'Close documentation' }))
    .toHaveAttribute('type', 'button');
  expect(button.dataset).toMatchObject({ owner: 'consumer', slot: 'close-button-root' });
});

test('keeps disabled asChild hosts semantic and prevents their activation', async () => {
  const childClick = rs.fn();
  const closeClick = rs.fn();

  render(AsChildCloseButton, {
    props: { label: 'Close documentation', disabled: true, childClick, onclick: closeClick },
  });

  const button = screen.getByRole('button', { name: 'Close documentation' });
  const close = page.getByRole('button', { name: 'Close documentation' });

  await expect.element(close).not.toHaveAttribute('disabled');
  await expect.element(close).toHaveAttribute('aria-disabled', 'true');
  await expect.element(close).toHaveAttribute('data-disabled');
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });

  expect(button.dispatchEvent(click)).toBe(false);
  expect(childClick).not.toHaveBeenCalled();
  expect(closeClick).not.toHaveBeenCalled();
});

test('preserves composed click handlers while enabled', async () => {
  const calls: string[] = [];

  render(AsChildCloseButton, {
    props: {
      label: 'Dismiss notification',
      onclickcapture: () => calls.push('close capture'),
      childClick: () => calls.push('button click'),
      onclick: () => calls.push('close click'),
    },
  });

  await page.getByRole('button', { name: 'Dismiss notification' }).click();

  expect(calls).toEqual(['close capture', 'button click', 'close click']);
});

test('prevents activation for native and aria-disabled buttons', async () => {
  const handleClick = rs.fn();
  const props = { 'aria-label': 'Close documentation', onclick: handleClick };
  const { rerender } = render(CloseButton, { props: { ...props, disabled: true } });

  const button = screen.getByRole('button', { name: 'Close documentation' });

  await expect.element(page.getByRole('button', { name: 'Close documentation' })).toBeDisabled();
  expect(handleClick).not.toHaveBeenCalled();

  await rerender({ ...props, disabled: false, 'aria-disabled': 'true' });

  await expect
    .element(page.getByRole('button', { name: 'Close documentation' }))
    .toHaveAttribute('data-disabled');
  const click = new MouseEvent('click', { bubbles: true, cancelable: true });

  expect(button.dispatchEvent(click)).toBe(false);
  expect(handleClick).not.toHaveBeenCalled();
});

test('preserves parent data hooks through asChild and merges a consumer class', async () => {
  render(AsChildCloseButton, {
    props: {
      label: 'Delete item',
      'data-scope': 'accordion',
      'data-part': 'trigger',
      'data-slot': 'accordion-trigger',
      'data-disabled': '',
      class: 'consumer-class',
    },
  });

  const button = screen.getByRole('button', { name: 'Delete item' });

  expect(button.dataset).toMatchObject({
    scope: 'accordion',
    part: 'trigger',
    slot: 'accordion-trigger',
  });
  await expect
    .element(page.getByRole('button', { name: 'Delete item' }))
    .toHaveAttribute('data-disabled');
  expect(button.className.endsWith('consumer-class')).toBe(true);
});

test('uses aria-labelledby without adding the default aria-label', async () => {
  render(LabelledCloseButton);

  await expect
    .element(page.getByRole('button', { name: 'Dismiss dialog' }))
    .not.toHaveAttribute('aria-label');
});