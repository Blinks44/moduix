import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import {
  Field,
  FieldErrorText,
  NumberInput,
  NumberInputContext,
  NumberInputField,
  NumberInputLabel,
  NumberInputRootProvider,
  useNumberInput,
} from '../src';

test('renders the Field shortcut and preserves keyboard value changes', async () => {
  const changes: string[] = [];
  const controlRef = createRef<HTMLDivElement>();

  render(
    <NumberInput defaultValue="2" onValueChange={(details) => changes.push(details.value)}>
      <NumberInputLabel>Amount</NumberInputLabel>
      <NumberInputField ref={controlRef} />
    </NumberInput>,
  );

  expect(controlRef.current?.getAttribute('data-slot')).toBe('number-input-control');
  const input = page.getByRole('spinbutton', { name: 'Amount', exact: true });
  await expect.element(input).toHaveAttribute('data-slot', 'number-input-input');
  await expect
    .element(page.getByRole('button', { name: 'decrease value', exact: true }))
    .toHaveAttribute('data-slot', 'number-input-decrement-trigger');
  await expect
    .element(page.getByRole('button', { name: 'increment value', exact: true }))
    .toHaveAttribute('data-slot', 'number-input-increment-trigger');

  await input.click();
  await input.press('ArrowUp');

  await expect.element(input).toHaveValue('3');
  expect(changes).toContain('3');
});

test('inherits Field state for disabled, read-only, and invalid number inputs', async () => {
  render(
    <Field disabled invalid readOnly>
      <NumberInput>
        <NumberInputLabel>Items</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <FieldErrorText>Choose a valid amount.</FieldErrorText>
    </Field>,
  );

  const input = page.getByRole('spinbutton', { name: 'Items', exact: true });
  await expect.element(input).toBeDisabled();
  await expect.element(input).toHaveAttribute('readonly');
  await expect.element(input).toHaveAttribute('aria-invalid', 'true');
  await expect
    .element(page.getByRole('button', { name: 'decrease value', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('button', { name: 'increment value', exact: true }))
    .toBeDisabled();
  await expect.element(page.getByText('Choose a valid amount.')).toBeVisible();
});

test('keeps RootProvider state and root asChild composition Ark-shaped', async () => {
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

  render(
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

  await expect.element(page.locator('section')).toHaveAttribute('data-slot', 'number-input-root');
  await page.getByRole('button', { name: 'Set maximum', exact: true }).click();
  await expect
    .element(page.getByRole('spinbutton', { name: 'Guests', exact: true }))
    .toHaveValue('10');
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