import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { Field, NumberInput, useNumberInput, FieldErrorText } from '../src';

test('renders the Field shortcut and preserves keyboard value changes', async () => {
  const changes: string[] = [];
  let controlRef!: HTMLDivElement;

  render(() => (
    <NumberInput defaultValue="2" onValueChange={(details) => changes.push(details.value)}>
      <NumberInput.Label>Amount</NumberInput.Label>
      <NumberInput.Field ref={(element) => (controlRef = element)} />
    </NumberInput>
  ));

  const input = screen.getByRole('spinbutton', { name: 'Amount' });

  expect(controlRef).toHaveAttribute('data-slot', 'number-input-control');
  expect(input).toHaveAttribute('data-slot', 'number-input-input');
  expect(screen.getByRole('button', { name: 'decrease value' })).toHaveAttribute(
    'data-slot',
    'number-input-decrement-trigger',
  );
  expect(screen.getByRole('button', { name: 'increment value' })).toHaveAttribute(
    'data-slot',
    'number-input-increment-trigger',
  );

  input.focus();
  fireEvent.focusIn(input);
  fireEvent.keyDown(input, { key: 'ArrowUp' });

  await waitFor(() => expect(input).toHaveValue('3'));
  expect(changes).toContain('3');
});

test('inherits Field state for disabled, read-only, and invalid number inputs', () => {
  render(() => (
    <Field disabled invalid readOnly>
      <NumberInput>
        <NumberInput.Label>Items</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <FieldErrorText>Choose a valid amount.</FieldErrorText>
    </Field>
  ));

  const input = screen.getByRole('spinbutton', { name: 'Items' });

  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('readonly');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('button', { name: 'decrease value' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'increment value' })).toBeDisabled();
  expect(screen.getByText('Choose a valid amount.')).toBeVisible();
});

test('keeps RootProvider state and root asChild composition Ark-shaped', async () => {
  function ProviderNumberInput() {
    const numberInput = useNumberInput({ defaultValue: '3', min: 1, max: 10 });

    return (
      <>
        <button type="button" onClick={() => numberInput().setToMax()}>
          Set maximum
        </button>
        <NumberInput.RootProvider value={numberInput}>
          <NumberInput.Label>Guests</NumberInput.Label>
          <NumberInput.Field />
        </NumberInput.RootProvider>
      </>
    );
  }

  const { container } = render(() => (
    <>
      <NumberInput asChild={(props) => <section {...props()} />} defaultValue="4">
        <NumberInput.Label>Capacity</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <ProviderNumberInput />
    </>
  ));

  expect(container.querySelector('section')).toHaveAttribute('data-slot', 'number-input-root');
  fireEvent.click(screen.getByRole('button', { name: 'Set maximum' }));
  await waitFor(() => expect(screen.getByRole('spinbutton', { name: 'Guests' })).toHaveValue('10'));
});

test('forwards refs through ordinary Ark Solid part paths', () => {
  let rootRef!: HTMLDivElement;
  let scrubberRef!: HTMLDivElement;

  render(() => (
    <NumberInput ref={(element) => (rootRef = element)}>
      <NumberInput.Scrubber ref={(element) => (scrubberRef = element)}>
        Adjust value
      </NumberInput.Scrubber>
      <NumberInput.Field />
    </NumberInput>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'number-input-root');
  expect(scrubberRef).toHaveAttribute('data-slot', 'number-input-scrubber');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <NumberInput
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} />}
    >
      <NumberInput.Field />
    </NumberInput>
  ));

  expect(rootRef).toBeUndefined();
});

test('supports numeric form submission through Context', () => {
  const { container } = render(() => (
    <form>
      <NumberInput defaultValue="42">
        <NumberInput.Label>Quantity</NumberInput.Label>
        <NumberInput.Field />
        <NumberInput.Context>
          {(context) => <input name="quantity" type="hidden" value={context().valueAsNumber} />}
        </NumberInput.Context>
      </NumberInput>
    </form>
  ));

  const form = container.querySelector('form');

  expect(form).not.toBeNull();
  expect(new FormData(form!).get('quantity')).toBe('42');
});

test('preserves native form ownership through name and form', () => {
  const { container } = render(() => (
    <>
      <form id="quantity-form" />
      <NumberInput defaultValue="42" form="quantity-form" name="quantity">
        <NumberInput.Label>Quantity</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
    </>
  ));

  const form = container.querySelector('form');

  expect(form).not.toBeNull();
  expect(new FormData(form!).get('quantity')).toBe('42');
});

test('applies native utilities to component-owned parts', () => {
  const { container } = render(() => (
    <NumberInput defaultValue="42">
      <NumberInput.Label>Amount</NumberInput.Label>
      <NumberInput.Scrubber>Adjust</NumberInput.Scrubber>
      <NumberInput.Field />
      <NumberInput.ValueText />
    </NumberInput>
  ));

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
  const { container } = render(() => (
    <NumberInput class="w-80 max-w-sm gap-4 text-primary">
      <NumberInput.Label>Amount</NumberInput.Label>
      <NumberInput.Control class="gap-4">
        <NumberInput.DecrementTrigger class="size-12 min-w-12 rounded-lg bg-muted p-2" />
        <NumberInput.Input class="h-12 w-40 rounded-md bg-muted px-0 py-0 text-primary" />
        <NumberInput.IncrementTrigger class="size-12 min-w-12 rounded-lg bg-muted p-2" />
      </NumberInput.Control>
    </NumberInput>
  ));

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
