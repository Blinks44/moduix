import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, useState } from 'react';
import {
  Field,
  PinInput,
  usePinInput,
  FieldErrorText,
  PinInputRootProvider,
  PinInputHiddenInput,
  PinInputLabel,
  PinInputControl,
  PinInputInputs,
} from '../src';

function ControlledPinInput() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <PinInput count={4} value={value} onValueChange={(details) => setValue(details.value)}>
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
  const { container } = render(
    <form>
      <PinInput count={4} defaultValue={['1', '2', '3', '4']} name="code" required>
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
        </PinInputControl>
        <PinInputHiddenInput />
      </PinInput>
    </form>,
  );

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
  render(<ControlledPinInput />);

  await page.getByRole('textbox').nth(0).click();
  await expect.element(page.getByRole('textbox').first()).toBeFocused();
  paste(document.querySelector<HTMLInputElement>('[data-slot="pin-input-input"]')!, '1234');

  await expect
    .poll(() => screen.getAllByRole('textbox').map((input) => input.getAttribute('value')))
    .toEqual(['1', '2', '3', '4']);
});

test('keeps invalid, disabled, and read-only Field state on visible inputs', async () => {
  render(
    <Field disabled invalid readOnly>
      <PinInput count={4}>
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
        </PinInputControl>
      </PinInput>
      <FieldErrorText>Enter a valid code.</FieldErrorText>
    </Field>,
  );

  for (const input of screen.getAllByRole('textbox')) {
    expect(input?.matches(':disabled')).toBe(true);
    expect(input?.hasAttribute('readonly')).toBe(true);
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  }
  await expect.element(page.getByText('Enter a valid code.')).toBeVisible();
});

test('submits the owning form after completing an auto-submit PinInput', async () => {
  let submittedCode = '';

  render(
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
    </form>,
  );

  await page.getByRole('textbox').nth(0).click();
  await expect.element(page.getByRole('textbox').first()).toBeFocused();
  paste(document.querySelector<HTMLInputElement>('[data-slot="pin-input-input"]')!, '1234');

  await expect.poll(() => submittedCode).toBe('1234');
});

test('preserves RootProvider and root asChild composition', async () => {
  const rootRef = createRef<HTMLDivElement>();

  function ProviderPinInput() {
    const pinInput = usePinInput({ count: 4, defaultValue: ['1'] });

    return (
      <>
        <button type="button" onClick={pinInput.clearValue}>
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

  const { container } = render(
    <>
      <PinInput asChild count={4} ref={rootRef}>
        <section>
          <PinInputLabel>Custom code</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
          <PinInputHiddenInput />
        </section>
      </PinInput>
      <ProviderPinInput />
    </>,
  );

  expect(rootRef.current?.getAttribute('data-slot')).toBe('pin-input-root');
  expect(container.querySelector('section input[aria-hidden="true"]')).not.toBeNull();
  await page.getByRole('button', { name: 'Clear code', exact: true }).click();
  await expect.element(page.getByLabel('Provider code')).toHaveValue('');
});