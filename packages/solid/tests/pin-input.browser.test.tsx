import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Field,
  PinInput,
  usePinInput,
  FieldErrorText,
  PinInputRootProvider,
  PinInputHiddenInput,
  PinInputLabel,
  PinInputControl,
  PinInputInput,
  PinInputInputs,
} from '../src';

function ControlledPinInput() {
  const [value, setValue] = createSignal<string[]>([]);

  return (
    <PinInput count={4} value={value()} onValueChange={(details) => setValue(details.value)}>
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  );
}

function paste(input: HTMLElement, value: string) {
  const clipboardData = new DataTransfer();
  clipboardData.setData('text/plain', value);
  input.dispatchEvent(
    new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData }),
  );
}

test('renders the recommended composition with Ark anatomy and form participation', async () => {
  const { container } = render(() => (
    <form>
      <PinInput count={4} defaultValue={['1', '2', '3', '4']} name="code" required>
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
        </PinInputControl>
        <PinInputHiddenInput />
      </PinInput>
    </form>
  ));

  const form = container.querySelector('form');
  const inputs = screen.getAllByRole('textbox');

  expect(inputs).toHaveLength(4);
  await expect
    .element(page.getByRole('textbox').nth(0))
    .toHaveAttribute('data-slot', 'pin-input-input');
  expect(container.querySelector('input[aria-hidden="true"]')).not.toBeNull();
  expect(new FormData(form!).get('code')).toBe('1234');
});

test('distributes pasted values through a controlled PinInput', async () => {
  render(() => <ControlledPinInput />);

  await page.getByRole('textbox').nth(0).click();
  await expect.element(page.getByRole('textbox').first()).toBeFocused();
  paste(document.querySelector<HTMLInputElement>('[data-slot="pin-input-input"]')!, '1234');

  await expect
    .poll(() => screen.getAllByRole('textbox').map((input) => input.getAttribute('value')))
    .toEqual(['1', '2', '3', '4']);
});

test('keeps invalid, disabled, and read-only Field state on visible inputs', async () => {
  render(() => (
    <Field disabled invalid readOnly>
      <PinInput count={4}>
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
        </PinInputControl>
      </PinInput>
      <FieldErrorText>Enter a valid code.</FieldErrorText>
    </Field>
  ));

  for (const input of screen.getAllByRole('textbox')) {
    expect(input?.matches(':disabled')).toBe(true);
    expect(input?.hasAttribute('readonly')).toBe(true);
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  }
  await expect.element(page.getByText('Enter a valid code.')).toBeVisible();
});

test('submits the owning form after completing an auto-submit PinInput', async () => {
  let submittedCode = '';

  render(() => (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submittedCode = new FormData(event.currentTarget).get('code') as string;
      }}
    >
      <PinInput autoSubmit count={4} name="code">
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
        </PinInputControl>
        <PinInputHiddenInput />
      </PinInput>
    </form>
  ));

  await page.getByRole('textbox').nth(0).click();
  await expect.element(page.getByRole('textbox').first()).toBeFocused();
  paste(document.querySelector<HTMLInputElement>('[data-slot="pin-input-input"]')!, '1234');

  await expect.poll(() => submittedCode).toBe('1234');
});

test('preserves RootProvider and root asChild composition', async () => {
  function ProviderPinInput() {
    const pinInput = usePinInput({ count: 4, defaultValue: ['1'] });

    return (
      <>
        <button type="button" onClick={() => pinInput().clearValue()}>
          Clear code
        </button>
        <PinInputRootProvider value={pinInput}>
          <PinInputLabel>Provider code</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
          <PinInputHiddenInput />
        </PinInputRootProvider>
      </>
    );
  }

  const { container } = render(() => (
    <>
      <PinInput asChild={(props) => <section {...props()} />} count={4}>
        <PinInputLabel>Custom code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
        </PinInputControl>
        <PinInputHiddenInput />
      </PinInput>
      <ProviderPinInput />
    </>
  ));

  await expect.element(page.locator('section')).toHaveAttribute('data-slot', 'pin-input-root');
  expect(container.querySelector('section input[aria-hidden="true"]')).not.toBeNull();
  await page.getByRole('button', { name: 'Clear code', exact: true }).click();
  await expect.element(page.getByLabel('Provider code')).toHaveValue('');
});

test('forwards refs through ordinary Ark Solid part paths', () => {
  let rootRef!: HTMLDivElement;
  let inputRef!: HTMLInputElement;

  render(() => (
    <PinInput ref={(element) => (rootRef = element)} count={4}>
      <PinInputControl>
        <PinInputInput ref={(element) => (inputRef = element)} index={0} />
      </PinInputControl>
    </PinInput>
  ));

  expect(rootRef?.getAttribute('data-slot')).toBe('pin-input-root');
  expect(inputRef?.getAttribute('data-slot')).toBe('pin-input-input');
});

test('does not forward refs through native Ark Solid asChild composition', async () => {
  let rootRef: HTMLElement | undefined;

  render(() => (
    <PinInput
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} aria-label="Pin input" />}
      count={4}
    >
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  ));

  await expect
    .element(page.getByRole('region', { name: 'Pin input', exact: true }))
    .toHaveAttribute('data-slot', 'pin-input-root');
  expect(rootRef).toBeUndefined();
});