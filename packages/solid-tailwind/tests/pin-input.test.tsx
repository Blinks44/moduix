import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
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
  PinInputSeparator,
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
  const event = new Event('paste', { bubbles: true, cancelable: true });

  Object.defineProperty(event, 'clipboardData', {
    value: {
      getData: () => value,
    },
  });

  input.dispatchEvent(event);
}

test('renders the recommended composition with Ark anatomy and form participation', () => {
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
  expect(inputs[0]).toHaveAttribute('data-slot', 'pin-input-input');
  expect(container.querySelector('input[aria-hidden="true"]')).not.toBeNull();
  expect(new FormData(form!).get('code')).toBe('1234');
});

test('distributes pasted values through a controlled PinInput', async () => {
  render(() => <ControlledPinInput />);

  const [firstInput] = screen.getAllByRole('textbox');
  firstInput.focus();
  fireEvent.focusIn(firstInput);
  paste(firstInput, '1234');

  await waitFor(() => {
    expect(screen.getAllByRole('textbox').map((input) => input.getAttribute('value'))).toEqual([
      '1',
      '2',
      '3',
      '4',
    ]);
  });
});

test('keeps invalid, disabled, and read-only Field state on visible inputs', () => {
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
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  }
  expect(screen.getByText('Enter a valid code.')).toBeVisible();
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

  const firstInput = screen.getAllByRole('textbox')[0];
  firstInput.focus();
  fireEvent.focusIn(firstInput);
  paste(firstInput, '1234');

  await waitFor(() => expect(submittedCode).toBe('1234'));
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

  expect(container.querySelector('section')).toHaveAttribute('data-slot', 'pin-input-root');
  expect(container.querySelector('section input[aria-hidden="true"]')).not.toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Clear code' }));
  await waitFor(() => expect(screen.getByLabelText('Provider code')).toHaveValue(''));
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

  expect(rootRef).toHaveAttribute('data-slot', 'pin-input-root');
  expect(inputRef).toHaveAttribute('data-slot', 'pin-input-input');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
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

  expect(screen.getByRole('region', { name: 'Pin input' })).toHaveAttribute(
    'data-slot',
    'pin-input-root',
  );
  expect(rootRef).toBeUndefined();
});

test('applies native utilities to component-owned parts', () => {
  const { container } = render(() => (
    <PinInput count={4}>
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
        <PinInputSeparator />
      </PinInputControl>
    </PinInput>
  ));

  expect(container.querySelector('[data-slot="pin-input-root"]')).toHaveClass(
    'inline-flex',
    'w-auto',
    'max-w-none',
    'flex-col',
    'items-start',
    'gap-2',
  );
  expect(container.querySelector('[data-slot="pin-input-label"]')).toHaveClass(
    'text-sm',
    'font-medium',
    'text-foreground',
  );
  expect(container.querySelector('[data-slot="pin-input-control"]')).toHaveClass(
    'inline-flex',
    'items-center',
    'gap-2',
  );
  expect(container.querySelector('[data-slot="pin-input-input"]')).toHaveClass(
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
  );
  expect(container.querySelector('[data-slot="pin-input-separator"]')).toHaveClass(
    'inline-flex',
    'size-4',
    'flex-none',
    'items-center',
    'justify-center',
    'text-muted-foreground',
    'leading-none',
    'pointer-events-none',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render(() => (
    <PinInput class="w-80 max-w-sm gap-4">
      <PinInputLabel class="text-lg text-primary">Verification code</PinInputLabel>
      <PinInputControl class="gap-4">
        <PinInputInput
          class="h-12 w-40 rounded-lg border-2 bg-muted px-2 py-1 text-primary"
          index={0}
        />
        <PinInputSeparator class="size-8 text-primary" />
      </PinInputControl>
    </PinInput>
  ));

  const root = container.querySelector('[data-slot="pin-input-root"]');
  const label = container.querySelector('[data-slot="pin-input-label"]');
  const control = container.querySelector('[data-slot="pin-input-control"]');
  const input = container.querySelector('[data-slot="pin-input-input"]');
  const separator = container.querySelector('[data-slot="pin-input-separator"]');

  expect(root).toHaveClass('w-80', 'max-w-sm', 'gap-4');
  expect(root).not.toHaveClass('w-auto', 'max-w-none', 'gap-2');
  expect(label).toHaveClass('text-lg', 'text-primary');
  expect(label).not.toHaveClass('text-sm', 'text-foreground');
  expect(control).toHaveClass('gap-4');
  expect(control).not.toHaveClass('gap-2');
  expect(input).toHaveClass(
    'h-12',
    'w-40',
    'rounded-lg',
    'border-2',
    'bg-muted',
    'px-2',
    'py-1',
    'text-primary',
  );
  expect(input).not.toHaveClass(
    'size-control-md',
    'rounded-md',
    'border',
    'bg-background',
    'px-0',
    'py-0',
    'text-foreground',
  );
  expect(separator).toHaveClass('size-8', 'text-primary');
  expect(separator).not.toHaveClass('size-4', 'text-muted-foreground');
});