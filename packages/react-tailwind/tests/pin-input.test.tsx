import { expect, test } from '@rstest/core';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { Field, PinInput, usePinInput, FieldErrorText } from '../src';

function ControlledPinInput() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <PinInput count={4} value={value} onValueChange={(details) => setValue(details.value)}>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
    </PinInput>
  );
}

test('renders the recommended composition with Ark anatomy and form participation', () => {
  const { container } = render(
    <form>
      <PinInput count={4} defaultValue={['1', '2', '3', '4']} name="code" required>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInput.Inputs />
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput>
    </form>,
  );

  const form = container.querySelector('form');
  const inputs = screen.getAllByRole('textbox');

  expect(inputs).toHaveLength(4);
  expect(inputs[0]).toHaveAttribute('data-slot', 'pin-input-input');
  expect(container.querySelector('input[aria-hidden="true"]')).not.toBeNull();
  expect(new FormData(form!).get('code')).toBe('1234');
});

test('distributes pasted values through a controlled PinInput', async () => {
  const user = userEvent.setup();
  render(<ControlledPinInput />);

  const [firstInput] = screen.getAllByRole('textbox');
  await user.click(firstInput);
  await user.paste('1234');

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
  render(
    <Field disabled invalid readOnly>
      <PinInput count={4}>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInput.Inputs />
        </PinInput.Control>
      </PinInput>
      <FieldErrorText>Enter a valid code.</FieldErrorText>
    </Field>,
  );

  for (const input of screen.getAllByRole('textbox')) {
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  }
  expect(screen.getByText('Enter a valid code.')).toBeVisible();
});

test('submits the owning form after completing an auto-submit PinInput', async () => {
  const user = userEvent.setup();
  let submittedCode = '';

  render(
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submittedCode = new FormData(event.currentTarget).get('code') as string;
      }}
    >
      <PinInput autoSubmit count={4} name="code">
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInput.Inputs />
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput>
    </form>,
  );

  await user.click(screen.getAllByRole('textbox')[0]);
  await user.paste('1234');

  await waitFor(() => expect(submittedCode).toBe('1234'));
});

test('preserves RootProvider and root asChild composition', async () => {
  const user = userEvent.setup();
  const rootRef = createRef<HTMLDivElement>();

  function ProviderPinInput() {
    const pinInput = usePinInput({ count: 4, defaultValue: ['1'] });

    return (
      <>
        <button type="button" onClick={pinInput.clearValue}>
          Clear code
        </button>
        <PinInput.RootProvider value={pinInput}>
          <PinInput.Label>Provider code</PinInput.Label>
          <PinInput.Control>
            <PinInput.Inputs />
          </PinInput.Control>
          <PinInput.HiddenInput />
        </PinInput.RootProvider>
      </>
    );
  }

  const { container } = render(
    <>
      <PinInput asChild count={4} ref={rootRef}>
        <section>
          <PinInput.Label>Custom code</PinInput.Label>
          <PinInput.Control>
            <PinInput.Inputs />
          </PinInput.Control>
          <PinInput.HiddenInput />
        </section>
      </PinInput>
      <ProviderPinInput />
    </>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'pin-input-root');
  expect(container.querySelector('section input[aria-hidden="true"]')).not.toBeNull();
  await user.click(screen.getByRole('button', { name: 'Clear code' }));
  await waitFor(() => expect(screen.getByLabelText('Provider code')).toHaveValue(''));
});

test('applies native utilities to component-owned parts', () => {
  const { container } = render(
    <PinInput count={4}>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
        <PinInput.Separator />
      </PinInput.Control>
    </PinInput>,
  );

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
  const { container } = render(
    <PinInput className="w-80 max-w-sm gap-4">
      <PinInput.Label className="text-lg text-primary">Verification code</PinInput.Label>
      <PinInput.Control className="gap-4">
        <PinInput.Input
          className="h-12 w-40 rounded-lg border-2 bg-muted px-2 py-1 text-primary"
          index={0}
        />
        <PinInput.Separator className="size-8 text-primary" />
      </PinInput.Control>
    </PinInput>,
  );

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
