import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { Field, NumberInput, useNumberInput } from '../src';

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
      <Field.ErrorText>Choose a valid amount.</Field.ErrorText>
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