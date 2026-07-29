import { expect, test } from '@rstest/core';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Field, NumberInput, useNumberInput } from '../src';

test('renders the Field shortcut and preserves keyboard value changes', async () => {
  const changes: string[] = [];
  const controlRef = createRef<HTMLDivElement>();
  const user = userEvent.setup();

  render(
    <NumberInput defaultValue="2" onValueChange={(details) => changes.push(details.value)}>
      <NumberInput.Label>Amount</NumberInput.Label>
      <NumberInput.Field ref={controlRef} />
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
        <NumberInput.Label>Items</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <Field.ErrorText>Choose a valid amount.</Field.ErrorText>
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
        <NumberInput.RootProvider value={numberInput}>
          <NumberInput.Label>Guests</NumberInput.Label>
          <NumberInput.Field />
        </NumberInput.RootProvider>
      </>
    );
  }

  const { container } = render(
    <>
      <NumberInput asChild defaultValue="4">
        <section>
          <NumberInput.Label>Capacity</NumberInput.Label>
          <NumberInput.Field />
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
        <NumberInput.Label>Quantity</NumberInput.Label>
        <NumberInput.Field />
        <NumberInput.Context>
          {(context) => <input name="quantity" type="hidden" value={context.valueAsNumber} />}
        </NumberInput.Context>
      </NumberInput>
    </form>,
  );

  const form = container.querySelector('form');

  expect(form).not.toBeNull();
  expect(new FormData(form!).get('quantity')).toBe('42');
});