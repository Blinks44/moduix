import { expect, test } from '@rstest/core';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import {
  Field,
  FieldErrorText,
  NumberInput,
  NumberInputContext,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputField,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
  NumberInputRootProvider,
  NumberInputScrubber,
  NumberInputValueText,
  useNumberInput,
} from '../src';

test('renders the Field shortcut and preserves keyboard value changes', async () => {
  const changes: string[] = [];
  const controlRef = createRef<HTMLDivElement>();
  const user = userEvent.setup();

  render(
    <NumberInput defaultValue="2" onValueChange={(details) => changes.push(details.value)}>
      <NumberInputLabel>Amount</NumberInputLabel>
      <NumberInputField ref={controlRef} />
    </NumberInput>,
  );

  const input = screen.getByRole('spinbutton', { name: 'Amount' });

  expect(controlRef.current).toHaveAttribute('data-slot', 'number-input-control');
  expect(input).toHaveAttribute('data-slot', 'number-input-input');
  expect(screen.getByRole('button', { name: 'decrease value' })).toHaveAttribute(
    'data-slot',
    'number-input-decrement-trigger',
  );
  expect(screen.getByRole('button', { name: 'increment value' })).toHaveAttribute(
    'data-slot',
    'number-input-increment-trigger',
  );

  await user.click(input);
  await user.keyboard('{ArrowUp}');

  await waitFor(() => expect(input).toHaveValue('3'));
  expect(changes).toContain('3');
});

test('inherits Field state for disabled, read-only, and invalid number inputs', () => {
  render(
    <Field disabled invalid readOnly>
      <NumberInput>
        <NumberInputLabel>Items</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <FieldErrorText>Choose a valid amount.</FieldErrorText>
    </Field>,
  );

  const input = screen.getByRole('spinbutton', { name: 'Items' });

  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('readonly');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('button', { name: 'decrease value' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'increment value' })).toBeDisabled();
  expect(screen.getByText('Choose a valid amount.')).toBeVisible();
});

test('keeps RootProvider state and root asChild composition Ark-shaped', async () => {
  const user = userEvent.setup();

  function ProviderNumberInput() {
    const numberInput = useNumberInput({ defaultValue: '3', min: 1, max: 10 });

    return (
      <>
        <button type="button" onClick={() => numberInput.setToMax()}>
          Set maximum
        </button>
        <NumberInputRootProvider value={numberInput}>
          <NumberInputLabel>Guests</NumberInputLabel>
          <NumberInputField />
        </NumberInputRootProvider>
      </>
    );
  }

  const { container } = render(
    <>
      <NumberInput asChild defaultValue="4">
        <section>
          <NumberInputLabel>Capacity</NumberInputLabel>
          <NumberInputField />
        </section>
      </NumberInput>
      <ProviderNumberInput />
    </>,
  );

  expect(container.querySelector('section')).toHaveAttribute('data-slot', 'number-input-root');
  await user.click(screen.getByRole('button', { name: 'Set maximum' }));
  await waitFor(() => expect(screen.getByRole('spinbutton', { name: 'Guests' })).toHaveValue('10'));
});

test('supports numeric form submission through Context', () => {
  const { container } = render(
    <form>
      <NumberInput defaultValue="42">
        <NumberInputLabel>Quantity</NumberInputLabel>
        <NumberInputField />
        <NumberInputContext>
          {(context) => <input name="quantity" type="hidden" value={context.valueAsNumber} />}
        </NumberInputContext>
      </NumberInput>
    </form>,
  );

  const form = container.querySelector('form');

  expect(form).not.toBeNull();
  expect(new FormData(form!).get('quantity')).toBe('42');
});

test('preserves native form ownership through name and form', () => {
  const { container } = render(
    <>
      <form id="quantity-form" />
      <NumberInput defaultValue="42" form="quantity-form" name="quantity">
        <NumberInputLabel>Quantity</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
    </>,
  );

  const form = container.querySelector('form');

  expect(form).not.toBeNull();
  expect(new FormData(form!).get('quantity')).toBe('42');
});

test('applies native utilities to component-owned parts', () => {
  const { container } = render(
    <NumberInput defaultValue="42">
      <NumberInputLabel>Amount</NumberInputLabel>
      <NumberInputScrubber>Adjust</NumberInputScrubber>
      <NumberInputField />
      <NumberInputValueText />
    </NumberInput>,
  );

  expect(container.querySelector('[data-slot="number-input-root"]')).toHaveClass(
    'group/number-input',
    'flex',
    'w-auto',
    'max-w-none',
    'flex-col',
    'items-start',
    'gap-1',
  );
  expect(container.querySelector('[data-slot="number-input-label"]')).toHaveClass(
    'text-sm',
    'leading-5',
    'font-medium',
    'text-foreground',
  );
  expect(container.querySelector('[data-slot="number-input-scrubber"]')).toHaveClass(
    'inline-flex',
    'items-center',
    'gap-2',
    'cursor-ew-resize',
  );
  expect(container.querySelector('[data-slot="number-input-control"]')).toHaveClass(
    'inline-flex',
    'items-stretch',
  );
  expect(container.querySelector('[data-slot="number-input-decrement-trigger"]')).toHaveClass(
    'size-control-md',
    'min-w-control-md',
    'rounded-s-md',
    'border-e-0',
    'bg-background',
  );
  expect(container.querySelector('[data-slot="number-input-input"]')).toHaveClass(
    'h-control-md',
    'w-24',
    'rounded-none',
    'border-x-0',
    'border-y',
    'px-3',
    'py-1',
    'text-center',
    'text-md',
    'tabular-nums',
  );
  expect(container.querySelector('[data-slot="number-input-increment-trigger"]')).toHaveClass(
    'size-control-md',
    'min-w-control-md',
    'rounded-e-md',
    'border-s-0',
    'bg-background',
  );
  expect(container.querySelector('[data-slot="number-input-value-text"]')).toHaveClass(
    'text-sm',
    'leading-5',
    'tabular-nums',
    'text-muted-foreground',
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render(
    <NumberInput className="w-80 max-w-sm gap-4 text-primary">
      <NumberInputLabel>Amount</NumberInputLabel>
      <NumberInputControl className="gap-4">
        <NumberInputDecrementTrigger className="size-12 min-w-12 rounded-lg bg-muted p-2" />
        <NumberInputInput className="h-12 w-40 rounded-md bg-muted px-0 py-0 text-primary" />
        <NumberInputIncrementTrigger className="size-12 min-w-12 rounded-lg bg-muted p-2" />
      </NumberInputControl>
    </NumberInput>,
  );

  const root = container.querySelector('[data-slot="number-input-root"]');
  const control = container.querySelector('[data-slot="number-input-control"]');
  const decrement = container.querySelector('[data-slot="number-input-decrement-trigger"]');
  const input = container.querySelector('[data-slot="number-input-input"]');

  expect(root).toHaveClass('w-80', 'max-w-sm', 'gap-4', 'text-primary');
  expect(root).not.toHaveClass('w-auto', 'max-w-none', 'gap-1');
  expect(control).toHaveClass('gap-4');
  expect(decrement).toHaveClass('size-12', 'min-w-12', 'rounded-lg', 'bg-muted', 'p-2');
  expect(decrement).not.toHaveClass(
    'size-control-md',
    'min-w-control-md',
    'rounded-s-md',
    'bg-background',
    'p-0',
  );
  expect(input).toHaveClass(
    'h-12',
    'w-40',
    'rounded-md',
    'bg-muted',
    'px-0',
    'py-0',
    'text-primary',
  );
  expect(input).not.toHaveClass(
    'h-control-md',
    'w-24',
    'rounded-none',
    'bg-background',
    'px-3',
    'py-1',
  );
});
