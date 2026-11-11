import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import ClassesPinInput from './pin-input/ClassesPinInput.svelte';
import CompositionPinInput from './pin-input/CompositionPinInput.svelte';
import ControlledPinInput from './pin-input/ControlledPinInput.svelte';
import FieldPinInput from './pin-input/FieldPinInput.svelte';
import FormPinInput from './pin-input/FormPinInput.svelte';
import HookPinInput from './pin-input/HookPinInput.svelte';

function paste(input: HTMLElement, value: string) {
  const clipboardData = new DataTransfer();
  clipboardData.setData('text/plain', value);
  input.dispatchEvent(
    new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData }),
  );
}

test('renders the recommended composition with Ark anatomy and form participation', async () => {
  const { container } = render(FormPinInput, {
    props: { defaultValue: ['1', '2', '3', '4'], required: true },
  });

  const form = container.querySelector('form');
  const inputs = screen.getAllByRole('textbox');
  expect(inputs).toHaveLength(4);
  await expect
    .element(page.getByRole('textbox').nth(0))
    .toHaveAttribute('data-slot', 'pin-input-input');
  await expect
    .element(page.locator('[data-slot="pin-input-root"]'))
    .toHaveAttribute('data-scope', 'pin-input');
  await expect
    .element(page.locator('[data-slot="pin-input-root"]'))
    .toHaveAttribute('data-part', 'root');
  await expect
    .element(page.getByText('Verification code'))
    .toHaveAttribute('data-slot', 'pin-input-label');
  expect(container.querySelector('input[aria-hidden="true"]')).not.toBeNull();
  expect(new FormData(form!).get('code')).toBe('1234');
});

test('distributes pasted values through controlled bind:value and forwards one value event', async () => {
  const changes: string[] = [];
  const { component } = render(ControlledPinInput, { props: { changes } });

  await page.getByRole('textbox').nth(0).click();
  await expect.element(page.getByRole('textbox').first()).toBeFocused();
  paste(document.querySelector<HTMLInputElement>('[data-slot="pin-input-input"]')!, '1234');
  await expect
    .poll(() => screen.getAllByRole('textbox').map((input) => input.getAttribute('value')))
    .toEqual(['1', '2', '3', '4']);
  expect(component.getValue()).toEqual(['1', '2', '3', '4']);
  expect(changes.at(-1)).toBe('1234');
});

test('forwards hook callbacks once', async () => {
  const onValueChange = rs.fn();
  const onValueComplete = rs.fn();
  render(HookPinInput, { props: { onValueChange, onValueComplete } });

  await page.getByRole('textbox').nth(0).click();
  await expect.element(page.getByRole('textbox').first()).toBeFocused();
  paste(document.querySelector<HTMLInputElement>('[data-slot="pin-input-input"]')!, '1234');
  await expect.poll(() => onValueComplete).toHaveBeenCalledTimes(1);
  expect(onValueChange).toHaveBeenCalledTimes(1);
});

test('keeps invalid, disabled, and read-only Field state on visible inputs', async () => {
  render(FieldPinInput);

  for (const input of screen.getAllByRole('textbox')) {
    expect(input.matches(':disabled')).toBe(true);
    expect(input.hasAttribute('readonly')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
  }
  await expect.element(page.getByText('Enter a valid code.')).toBeVisible();
});

test('submits the owning form after completing an auto-submit PinInput', async () => {
  let submittedCode = '';
  render(FormPinInput, {
    props: {
      autoSubmit: true,
      onsubmit: (event: SubmitEvent) => {
        event.preventDefault();
        submittedCode = new FormData(event.currentTarget as HTMLFormElement).get('code') as string;
      },
    },
  });

  await page.getByRole('textbox').nth(0).click();
  await expect.element(page.getByRole('textbox').first()).toBeFocused();
  paste(document.querySelector<HTMLInputElement>('[data-slot="pin-input-input"]')!, '1234');
  await expect.poll(() => submittedCode).toBe('1234');
});

test('preserves RootProvider, context, refs, attrs, and asChild composition', async () => {
  const { component } = render(CompositionPinInput);
  const { rootRef, inputRef } = component.getRefs();

  expect(rootRef).toBe(screen.getByRole('region', { name: 'Custom code' }));
  expect(rootRef?.getAttribute('data-slot')).toBe('pin-input-root');
  expect(rootRef?.getAttribute('data-probe')).toBe('root');
  expect(inputRef?.getAttribute('data-slot')).toBe('pin-input-input');
  await expect.element(page.getByText('Provider value: 1')).toBeAttached();
  await page.getByRole('button', { name: 'Clear code', exact: true }).click();
  await expect.element(page.getByText('Provider value:')).toBeAttached();
  await expect.element(page.getByRole('textbox').nth(0)).toHaveValue('');
});

test('uses moduix styles and lets consumer classes win', async () => {
  const { container } = render(ClassesPinInput);

  const root = container.querySelector('[data-slot="pin-input-root"]');
  expect(root?.className.endsWith('consumer-root')).toBe(true);
  await expect
    .element(page.locator('[data-slot="pin-input-separator"]'))
    .toHaveAttribute('aria-hidden', 'true');
});