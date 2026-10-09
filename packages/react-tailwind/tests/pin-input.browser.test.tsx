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
  PinInputInput,
  PinInputInputs,
  PinInputSeparator,
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

test('applies native utilities to component-owned parts', () => {
  const { container } = render(
    <PinInput count={4}>
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
        <PinInputSeparator />
      </PinInputControl>
    </PinInput>,
  );

  expect([...container.querySelector('[data-slot="pin-input-root"]')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'w-auto',
      'max-w-none',
      'flex-col',
      'items-start',
      'gap-2',
    ]),
  );
  expect([...container.querySelector('[data-slot="pin-input-label"]')!.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'font-medium', 'text-foreground']),
  );
  expect([...container.querySelector('[data-slot="pin-input-control"]')!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'items-center', 'gap-2']),
  );
  expect([...container.querySelector('[data-slot="pin-input-input"]')!.classList]).toEqual(
    expect.arrayContaining([
      'size-control-md',
      'flex-none',
      'rounded-md',
      'border',
      'bg-background',
      'px-0',
      'py-0',
      'text-center',
      'text-lg',
      'font-medium',
      'text-foreground',
      'tabular-nums',
    ]),
  );
  expect([...container.querySelector('[data-slot="pin-input-separator"]')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'size-4',
      'flex-none',
      'items-center',
      'justify-center',
      'text-muted-foreground',
      'leading-none',
      'pointer-events-none',
    ]),
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render(
    <PinInput className="w-80 max-w-sm gap-4">
      <PinInputLabel className="text-lg text-primary">Verification code</PinInputLabel>
      <PinInputControl className="gap-4">
        <PinInputInput
          className="h-12 w-40 rounded-lg border-2 bg-muted px-2 py-1 text-primary"
          index={0}
        />
        <PinInputSeparator className="size-8 text-primary" />
      </PinInputControl>
    </PinInput>,
  );

  const root = container.querySelector('[data-slot="pin-input-root"]');
  const label = container.querySelector('[data-slot="pin-input-label"]');
  const control = container.querySelector('[data-slot="pin-input-control"]');
  const input = container.querySelector('[data-slot="pin-input-input"]');
  const separator = container.querySelector('[data-slot="pin-input-separator"]');

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4']));
  expect(['w-auto', 'max-w-none', 'gap-2'].some((name) => root?.classList.contains(name))).toBe(
    false,
  );
  expect([...label!.classList]).toEqual(expect.arrayContaining(['text-lg', 'text-primary']));
  expect(['text-sm', 'text-foreground'].some((name) => label?.classList.contains(name))).toBe(
    false,
  );
  expect([...control!.classList]).toEqual(expect.arrayContaining(['gap-4']));
  expect(control?.classList.contains('gap-2')).toBe(false);
  expect(getComputedStyle(input!).width).toBe('160px');
  expect(getComputedStyle(input!).height).toBe('48px');
  expect([...input!.classList]).toEqual(
    expect.arrayContaining([
      'h-12',
      'w-40',
      'rounded-lg',
      'border-2',
      'bg-muted',
      'px-2',
      'py-1',
      'text-primary',
    ]),
  );
  expect(
    ['rounded-md', 'border', 'bg-background', 'px-0', 'py-0', 'text-foreground'].some((name) =>
      input?.classList.contains(name),
    ),
  ).toBe(false);
  expect([...separator!.classList]).toEqual(expect.arrayContaining(['size-8', 'text-primary']));
  expect(
    ['size-4', 'text-muted-foreground'].some((name) => separator?.classList.contains(name)),
  ).toBe(false);
});