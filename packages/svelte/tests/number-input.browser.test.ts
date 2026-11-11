import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AnatomyNumberInput from './number-input/AnatomyNumberInput.svelte';
import AsChildNumberInput from './number-input/AsChildNumberInput.svelte';
import ClassesNumberInput from './number-input/ClassesNumberInput.svelte';
import CommitNumberInput from './number-input/CommitNumberInput.svelte';
import ContextFormNumberInput from './number-input/ContextFormNumberInput.svelte';
import ControlledNumberInput from './number-input/ControlledNumberInput.svelte';
import FieldNumberInput from './number-input/FieldNumberInput.svelte';
import InvalidNumberInput from './number-input/InvalidNumberInput.svelte';
import OwnerFormNumberInput from './number-input/OwnerFormNumberInput.svelte';
import ProviderNumberInput from './number-input/ProviderNumberInput.svelte';
import ValueTextNumberInput from './number-input/ValueTextNumberInput.svelte';

test('preserves Ark anatomy, accessible naming, forwarded attributes, refs, and trigger defaults', async () => {
  const { component } = render(AnatomyNumberInput);
  const { rootRef, scrubberRef, fieldRef } = component.getRefs();

  const root = rootRef as HTMLElement;
  const scrubber = screen.getByText('Adjust value');
  const control = screen.getByRole('spinbutton', { name: 'Amount' }).parentElement;
  const decrement = screen.getByRole('button', { name: 'decrease value' });
  const increment = screen.getByRole('button', { name: 'increment value' });

  expect(root.getAttribute('data-scope')).toBe('number-input');
  expect(root.getAttribute('data-part')).toBe('root');
  expect(root.getAttribute('data-slot')).toBe('number-input-root');
  expect(root.getAttribute('data-probe')).toBe('root');
  await expect.element(page.getByText('Amount')).toHaveAttribute('data-part', 'label');
  await expect.element(page.getByText('Amount')).toHaveAttribute('data-slot', 'number-input-label');
  await expect.element(page.getByText('Adjust value')).toHaveAttribute('data-part', 'scrubber');
  await expect
    .element(page.getByText('Adjust value'))
    .toHaveAttribute('data-slot', 'number-input-scrubber');
  expect(fieldRef?.getAttribute('data-part')).toBe('control');
  expect(fieldRef?.getAttribute('data-slot')).toBe('number-input-control');
  expect(control).toBe(fieldRef);
  const input = page.getByRole('spinbutton', { name: 'Amount', exact: true });
  await expect.element(input).toHaveAttribute('data-part', 'input');
  await expect.element(input).toHaveAttribute('data-slot', 'number-input-input');
  await expect.element(input).toHaveAttribute('aria-valuenow', '2');
  await expect
    .element(page.getByRole('button', { name: 'decrease value', exact: true }))
    .toHaveAttribute('data-part', 'decrement-trigger');
  await expect
    .element(page.getByRole('button', { name: 'decrease value', exact: true }))
    .toHaveAttribute('data-slot', 'number-input-decrement-trigger');
  await expect
    .element(page.getByRole('button', { name: 'increment value', exact: true }))
    .toHaveAttribute('data-part', 'increment-trigger');
  await expect
    .element(page.getByRole('button', { name: 'increment value', exact: true }))
    .toHaveAttribute('data-slot', 'number-input-increment-trigger');
  expect(Boolean(decrement.querySelector('svg')?.isConnected)).toBe(true);
  expect(Boolean(increment.querySelector('svg')?.isConnected)).toBe(true);
  await expect
    .element(page.locator('[data-slot="number-input-value-text"]'))
    .toHaveAttribute('data-part', 'value-text');
  await expect
    .element(page.locator('[data-slot="number-input-value-text"]'))
    .toHaveAttribute('data-slot', 'number-input-value-text');
  expect(scrubberRef).toBe(scrubber);
});

test('supports controlled bind:value and forwards Ark value and focus details once', async () => {
  const valueChanges: Array<{ value: string; valueAsNumber: number }> = [];
  const focusChanges: Array<{ focused: boolean }> = [];
  render(ControlledNumberInput, { props: { focusChanges, valueChanges } });

  const input = page.getByRole('spinbutton', { name: 'Amount', exact: true });
  await input.click();
  await expect
    .element(page.locator('[data-slot="number-input-root"]'))
    .toHaveAttribute('data-focus');
  await input.press('ArrowUp');
  await expect.element(input).toHaveValue('3');
  await expect.element(page.locator('output').filter({ hasText: '3' })).toBeAttached();
  expect(valueChanges).toHaveLength(1);
  expect(valueChanges[0]).toMatchObject({ value: '3', valueAsNumber: 3 });
  expect(focusChanges).toHaveLength(1);
  expect(focusChanges[0]).toMatchObject({ focused: true });
});

test('inherits Field state for disabled, read-only, and invalid number inputs', async () => {
  render(FieldNumberInput);

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
  await expect.element(page.getByText('Value must be in range.')).toBeVisible();
});

test('forwards Ark value-invalid details', async () => {
  const invalidDetails: Array<{ reason: string; value: string; valueAsNumber: number }> = [];
  render(InvalidNumberInput, { props: { invalidDetails } });

  const input = page.getByRole('spinbutton', { name: 'Items', exact: true });
  await input.click();
  await input.fill('11');
  await input.press('Tab');

  await expect.poll(() => invalidDetails).toHaveLength(1);
  expect(invalidDetails[0]).toMatchObject({
    reason: 'rangeOverflow',
    value: '11',
    valueAsNumber: 11,
  });
});

test('keeps RootProvider state and the number input context connected', async () => {
  render(ProviderNumberInput);

  await expect
    .element(page.getByRole('spinbutton', { name: 'Guests', exact: true }))
    .toHaveValue('3');
  await expect.element(page.locator('output').filter({ hasText: '3' })).toBeAttached();
  await page.getByRole('button', { name: 'Set maximum', exact: true }).click();
  await expect
    .element(page.getByRole('spinbutton', { name: 'Guests', exact: true }))
    .toHaveValue('10');
  await expect.element(page.locator('output').filter({ hasText: '10' })).toBeAttached();
});

test('preserves the root and part asChild hosts and Svelte refs', async () => {
  const { component } = render(AsChildNumberInput);

  const root = screen.getByRole('region', { name: 'Capacity' });
  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Capacity', exact: true }))
    .toHaveAttribute('data-slot', 'number-input-root');
  await expect
    .element(page.getByRole('region', { name: 'Capacity', exact: true }))
    .toHaveAttribute('data-probe', 'root');
  expect(component.getRootRef()).toBe(root);
  await expect
    .element(page.getByRole('button', { name: 'Decrease custom value', exact: true }))
    .toHaveAttribute('data-slot', 'number-input-decrement-trigger');
  await expect
    .element(page.getByRole('button', { name: 'Decrease custom value', exact: true }))
    .toHaveAttribute('data-part', 'decrement-trigger');
});

test('supports numeric form submission through NumberInputContext', () => {
  const { container } = render(ContextFormNumberInput);

  const form = container.querySelector('form');
  expect(form).not.toBeNull();
  expect(new FormData(form!).get('quantity')).toBe('42');
});

test('preserves native form ownership through name and form', () => {
  const { container } = render(OwnerFormNumberInput);

  const form = container.querySelector('form');
  expect(form).not.toBeNull();
  expect(new FormData(form!).get('quantity')).toBe('42');
});

test('keeps consumer classes on the styled root and parts', () => {
  const { container } = render(ClassesNumberInput);

  expect([...container.querySelector('[data-slot="number-input-root"]')!.classList]).toEqual(
    expect.arrayContaining(['consumer-root']),
  );
  expect([...container.querySelector('[data-slot="number-input-label"]')!.classList]).toEqual(
    expect.arrayContaining(['consumer-label']),
  );
  expect([...container.querySelector('[data-slot="number-input-control"]')!.classList]).toEqual(
    expect.arrayContaining(['consumer-control']),
  );
  expect([
    ...container.querySelector('[data-slot="number-input-decrement-trigger"]')!.classList,
  ]).toEqual(expect.arrayContaining(['consumer-decrement']));
  expect([...container.querySelector('[data-slot="number-input-input"]')!.classList]).toEqual(
    expect.arrayContaining(['consumer-input']),
  );
  expect([
    ...container.querySelector('[data-slot="number-input-increment-trigger"]')!.classList,
  ]).toEqual(expect.arrayContaining(['consumer-increment']));
});

test('renders the formatted value in NumberInputValueText', async () => {
  render(ValueTextNumberInput);

  await expect.element(page.getByText('2')).toBeAttached();
});

test('reports value commit details through the hook on blur and Enter', async () => {
  const commits: Array<{ value: string; valueAsNumber: number }> = [];
  render(CommitNumberInput, { props: { commits } });

  const input = page.getByRole('spinbutton', { name: 'Amount' });
  await input.click();
  await input.fill('3');
  await expect.element(input).toHaveAttribute('aria-valuenow', '3');
  await page.getByRole('button', { name: 'After input' }).click();
  await expect.poll(() => commits).toEqual([{ value: '3', valueAsNumber: 3 }]);

  await input.click();
  await input.fill('4');
  await expect.element(input).toHaveAttribute('aria-valuenow', '4');
  await input.press('Enter');
  await expect
    .poll(() => commits)
    .toEqual([
      { value: '3', valueAsNumber: 3 },
      { value: '4', valueAsNumber: 4 },
    ]);
});