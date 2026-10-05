import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
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
  let controlRef!: HTMLDivElement;

  render(() => (
    <NumberInput defaultValue="2" onValueChange={(details) => changes.push(details.value)}>
      <NumberInputLabel>Amount</NumberInputLabel>
      <NumberInputField ref={(element) => (controlRef = element)} />
    </NumberInput>
  ));

  expect(controlRef?.getAttribute('data-slot')).toBe('number-input-control');
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
  render(() => (
    <Field disabled invalid readOnly>
      <NumberInput>
        <NumberInputLabel>Items</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <FieldErrorText>Choose a valid amount.</FieldErrorText>
    </Field>
  ));

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
        <button type="button" onClick={() => numberInput().setToMax()}>
          Set maximum
        </button>
        <NumberInputRootProvider value={numberInput}>
          <NumberInputLabel>Guests</NumberInputLabel>
          <NumberInputField />
        </NumberInputRootProvider>
      </>
    );
  }

  render(() => (
    <>
      <NumberInput asChild={(props) => <section {...props()} />} defaultValue="4">
        <NumberInputLabel>Capacity</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <ProviderNumberInput />
    </>
  ));

  await expect.element(page.locator('section')).toHaveAttribute('data-slot', 'number-input-root');
  await page.getByRole('button', { name: 'Set maximum', exact: true }).click();
  await expect
    .element(page.getByRole('spinbutton', { name: 'Guests', exact: true }))
    .toHaveValue('10');
});

test('forwards refs through ordinary Ark Solid part paths', () => {
  let rootRef!: HTMLDivElement;
  let scrubberRef!: HTMLDivElement;

  render(() => (
    <NumberInput ref={(element) => (rootRef = element)}>
      <NumberInputScrubber ref={(element) => (scrubberRef = element)}>
        Adjust value
      </NumberInputScrubber>
      <NumberInputField />
    </NumberInput>
  ));

  expect(rootRef?.getAttribute('data-slot')).toBe('number-input-root');
  expect(scrubberRef?.getAttribute('data-slot')).toBe('number-input-scrubber');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <NumberInput
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} />}
    >
      <NumberInputField />
    </NumberInput>
  ));

  expect(rootRef).toBeUndefined();
});

test('supports numeric form submission through Context', () => {
  const { container } = render(() => (
    <form>
      <NumberInput defaultValue="42">
        <NumberInputLabel>Quantity</NumberInputLabel>
        <NumberInputField />
        <NumberInputContext>
          {(context) => <input name="quantity" type="hidden" value={context().valueAsNumber} />}
        </NumberInputContext>
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
        <NumberInputLabel>Quantity</NumberInputLabel>
        <NumberInputField />
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
      <NumberInputLabel>Amount</NumberInputLabel>
      <NumberInputScrubber>Adjust</NumberInputScrubber>
      <NumberInputField />
      <NumberInputValueText />
    </NumberInput>
  ));

  expect([...container.querySelector('[data-slot="number-input-root"]')!.classList]).toEqual(
    expect.arrayContaining([
      'group/number-input',
      'flex',
      'w-auto',
      'max-w-none',
      'flex-col',
      'items-start',
      'gap-1',
    ]),
  );
  expect([...container.querySelector('[data-slot="number-input-label"]')!.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'leading-5', 'font-medium', 'text-foreground']),
  );
  expect([...container.querySelector('[data-slot="number-input-scrubber"]')!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'items-center', 'gap-2', 'cursor-ew-resize']),
  );
  expect([...container.querySelector('[data-slot="number-input-control"]')!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'items-stretch']),
  );
  expect([
    ...container.querySelector('[data-slot="number-input-decrement-trigger"]')!.classList,
  ]).toEqual(
    expect.arrayContaining([
      'size-control-md',
      'min-w-control-md',
      'rounded-s-md',
      'border-e-0',
      'bg-background',
    ]),
  );
  expect([...container.querySelector('[data-slot="number-input-input"]')!.classList]).toEqual(
    expect.arrayContaining([
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
    ]),
  );
  expect([
    ...container.querySelector('[data-slot="number-input-increment-trigger"]')!.classList,
  ]).toEqual(
    expect.arrayContaining([
      'size-control-md',
      'min-w-control-md',
      'rounded-e-md',
      'border-s-0',
      'bg-background',
    ]),
  );
  expect([...container.querySelector('[data-slot="number-input-value-text"]')!.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'leading-5', 'tabular-nums', 'text-muted-foreground']),
  );
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { container } = render(() => (
    <NumberInput class="w-80 max-w-sm gap-4 text-primary">
      <NumberInputLabel>Amount</NumberInputLabel>
      <NumberInputControl class="gap-4">
        <NumberInputDecrementTrigger class="size-12 min-w-12 rounded-lg bg-muted p-2" />
        <NumberInputInput class="h-12 w-40 rounded-md bg-muted px-0 py-0 text-primary" />
        <NumberInputIncrementTrigger class="size-12 min-w-12 rounded-lg bg-muted p-2" />
      </NumberInputControl>
    </NumberInput>
  ));

  const root = container.querySelector('[data-slot="number-input-root"]');
  const control = container.querySelector('[data-slot="number-input-control"]');
  const decrement = container.querySelector('[data-slot="number-input-decrement-trigger"]');
  const input = container.querySelector('[data-slot="number-input-input"]');

  expect([...root!.classList]).toEqual(
    expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4', 'text-primary']),
  );
  expect(['w-auto', 'max-w-none', 'gap-1'].some((name) => root?.classList.contains(name))).toBe(
    false,
  );
  expect([...control!.classList]).toEqual(expect.arrayContaining(['gap-4']));
  expect([...decrement!.classList]).toEqual(
    expect.arrayContaining(['size-12', 'min-w-12', 'rounded-lg', 'bg-muted', 'p-2']),
  );
  expect(
    ['size-control-md', 'min-w-control-md', 'rounded-s-md', 'bg-background', 'p-0'].some((name) =>
      decrement?.classList.contains(name),
    ),
  ).toBe(false);
  expect([...input!.classList]).toEqual(
    expect.arrayContaining([
      'h-12',
      'w-40',
      'rounded-md',
      'bg-muted',
      'px-0',
      'py-0',
      'text-primary',
    ]),
  );
  expect(
    ['h-control-md', 'w-24', 'rounded-none', 'bg-background', 'px-3', 'py-1'].some((name) =>
      input?.classList.contains(name),
    ),
  ).toBe(false);
  expect(getComputedStyle(root!).gap).toBe('16px');
  expect(getComputedStyle(input!).paddingLeft).toBe('0px');
});