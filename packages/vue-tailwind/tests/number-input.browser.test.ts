import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Field, FieldErrorText, FieldHelperText } from '../src/components/field';
import {
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
  useNumberInputContext,
} from '../src/components/number-input';
import NumberInputSsrConsumer from './number-input-ssr-consumer.vue';

const numberInputComponents = {
  Field,
  FieldErrorText,
  FieldHelperText,
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
};

test('preserves Ark anatomy, accessible naming, forwarded attributes, refs, and trigger defaults', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const scrubberRef = ref<ComponentPublicInstance>();
  const fieldRef = ref<ComponentPublicInstance>();
  const Harness = {
    components: numberInputComponents,
    setup() {
      return { fieldRef, rootRef, scrubberRef };
    },
    template: `
      <NumberInput ref="rootRef" default-value="2" data-probe="root">
        <NumberInputLabel>Amount</NumberInputLabel>
        <NumberInputScrubber ref="scrubberRef">Adjust value</NumberInputScrubber>
        <NumberInputField ref="fieldRef" />
        <NumberInputValueText />
      </NumberInput>
    `,
  };

  render(Harness);

  const root = rootRef.value?.$el as HTMLElement;

  const scrubber = screen.getByText('Adjust value');
  const control = screen.getByRole('spinbutton', { name: 'Amount' }).parentElement;

  const decrement = screen.getByRole('button', { name: 'decrease value' });
  const increment = screen.getByRole('button', { name: 'increment value' });

  expect(root?.getAttribute('data-scope')).toBe('number-input');
  expect(root?.getAttribute('data-part')).toBe('root');
  expect(root?.getAttribute('data-slot')).toBe('number-input-root');
  expect(root?.getAttribute('data-probe')).toBe('root');
  await expect.element(page.getByText('Amount')).toHaveAttribute('data-part', 'label');
  await expect.element(page.getByText('Amount')).toHaveAttribute('data-slot', 'number-input-label');
  await expect.element(page.getByText('Adjust value')).toHaveAttribute('data-part', 'scrubber');
  await expect
    .element(page.getByText('Adjust value'))
    .toHaveAttribute('data-slot', 'number-input-scrubber');
  expect(fieldRef.value?.$el?.getAttribute('data-part')).toBe('control');
  expect(fieldRef.value?.$el?.getAttribute('data-slot')).toBe('number-input-control');
  expect(control).toBe(fieldRef.value?.$el);
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
  expect(rootRef.value?.$el).toBe(root);
  expect(scrubberRef.value?.$el).toBe(scrubber);
});

test('supports controlled v-model and forwards Ark value and focus details once', async () => {
  const valueChanges: Array<{ value: string; valueAsNumber: number }> = [];
  const focusChanges: Array<{ focused: boolean }> = [];
  const Harness = {
    components: numberInputComponents,
    setup() {
      return { focusChanges, value: ref('2'), valueChanges };
    },
    template: `
      <NumberInput
        v-model="value"
        @value-change="valueChanges.push($event)"
        @focus-change="focusChanges.push($event)"
      >
        <NumberInputLabel>Amount</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <output>{{ value }}</output>
    `,
  };

  render(Harness);

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
  const Harness = {
    components: numberInputComponents,
    template: `
      <Field disabled invalid read-only>
        <NumberInput>
          <NumberInputLabel>Items</NumberInputLabel>
          <NumberInputField />
        </NumberInput>
        <FieldHelperText>Choose a valid amount.</FieldHelperText>
        <FieldErrorText>Value must be in range.</FieldErrorText>
      </Field>
    `,
  };

  render(Harness);

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
  const Harness = {
    components: numberInputComponents,
    setup() {
      return { invalidDetails };
    },
    template: `
      <NumberInput :min="1" :max="10" :clamp-value-on-blur="false" @value-invalid="invalidDetails.push($event)">
        <NumberInputLabel>Items</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
    `,
  };

  render(Harness);

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
  const RootState = defineComponent({
    setup() {
      const numberInput = useNumberInputContext();
      const setToMax = () => numberInput.value.setToMax();
      return { numberInput, setToMax };
    },
    template: `
      <button type="button" @click="setToMax">Set maximum</button>
      <output>{{ numberInput.valueAsNumber }}</output>
    `,
  });
  const Harness = {
    components: { ...numberInputComponents, RootState },
    setup() {
      return { numberInput: useNumberInput({ defaultValue: '3', min: 1, max: 10 }) };
    },
    template: `
      <NumberInputRootProvider :value="numberInput">
        <NumberInputLabel>Guests</NumberInputLabel>
        <NumberInputField />
        <RootState />
      </NumberInputRootProvider>
    `,
  };

  render(Harness);
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

test('preserves the root and part asChild hosts and Vue refs', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = {
    components: numberInputComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <NumberInput ref="rootRef" as-child default-value="4" data-probe="root">
        <section aria-label="Capacity">
          <NumberInputLabel>Capacity</NumberInputLabel>
          <NumberInputControl>
            <NumberInputDecrementTrigger as-child>
              <button type="button" aria-label="Decrease custom value">−</button>
            </NumberInputDecrementTrigger>
            <NumberInputInput />
            <NumberInputIncrementTrigger />
          </NumberInputControl>
        </section>
      </NumberInput>
    `,
  };

  render(Harness);
  const root = screen.getByRole('region', { name: 'Capacity' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Capacity', exact: true }))
    .toHaveAttribute('data-slot', 'number-input-root');
  await expect
    .element(page.getByRole('region', { name: 'Capacity', exact: true }))
    .toHaveAttribute('data-probe', 'root');
  expect(rootRef.value?.$el).toBe(root);
  await expect
    .element(page.getByRole('button', { name: 'Decrease custom value', exact: true }))
    .toHaveAttribute('data-slot', 'number-input-decrement-trigger');
  await expect
    .element(page.getByRole('button', { name: 'Decrease custom value', exact: true }))
    .toHaveAttribute('data-part', 'decrement-trigger');
});

test('supports numeric form submission through NumberInputContext', () => {
  const Harness = {
    components: numberInputComponents,
    template: `
      <form>
        <NumberInput default-value="42">
          <NumberInputLabel>Quantity</NumberInputLabel>
          <NumberInputField />
          <NumberInputContext v-slot="context">
            <input name="quantity" type="hidden" :value="context.valueAsNumber" />
          </NumberInputContext>
        </NumberInput>
      </form>
    `,
  };

  const { container } = render(Harness);
  const form = container.querySelector('form');

  expect(form).not.toBeNull();
  expect(new FormData(form!).get('quantity')).toBe('42');
});

test('preserves native form ownership through name and form', () => {
  const Harness = {
    components: numberInputComponents,
    template: `
      <form id="quantity-form" />
      <NumberInput default-value="42" form="quantity-form" name="quantity">
        <NumberInputLabel>Quantity</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
    `,
  };

  const { container } = render(Harness);
  const form = container.querySelector('form');

  expect(form).not.toBeNull();
  expect(new FormData(form!).get('quantity')).toBe('42');
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(NumberInputSsrConsumer));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const serverInput = host.querySelector('input');
  expect(serverInput).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);
  const app = createSSRApp(NumberInputSsrConsumer);
  const input = page.getByRole('spinbutton', { name: 'Amount' });
  try {
    app.mount(host);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(host.querySelector('input')).toBe(serverInput);
    await input.click();
    await input.press('ArrowUp');
    await expect.element(input).toHaveValue('8');
  } finally {
    app.unmount();
    host.remove();
  }
});

test('applies Tailwind defaults to every owned part', () => {
  const Harness = {
    components: numberInputComponents,
    template: `
      <NumberInput>
        <NumberInputLabel>Amount</NumberInputLabel>
        <NumberInputScrubber>Adjust</NumberInputScrubber>
        <NumberInputField />
        <NumberInputValueText />
      </NumberInput>
    `,
  };

  const { container } = render(Harness);

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

test('lets consumer Tailwind classes override component defaults', () => {
  const Harness = {
    components: numberInputComponents,
    template: `
      <NumberInput class="w-80 max-w-sm gap-4 text-primary">
        <NumberInputLabel>Amount</NumberInputLabel>
        <NumberInputControl class="gap-4">
          <NumberInputDecrementTrigger class="size-12 min-w-12 rounded-lg bg-muted p-2" />
          <NumberInputInput class="h-12 w-40 rounded-md bg-muted px-0 py-0 text-primary" />
          <NumberInputIncrementTrigger class="size-12 min-w-12 rounded-lg bg-muted p-2" />
        </NumberInputControl>
      </NumberInput>
    `,
  };

  const { container } = render(Harness);
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

// Ark Vue 5.39.2 does not declare or forward onValueCommit and renders no default value text.
test.skip('renders the formatted value in NumberInputValueText', async () => {
  const Harness = {
    components: numberInputComponents,
    template: `
      <NumberInput default-value="2">
        <NumberInputValueText />
      </NumberInput>
    `,
  };

  render(Harness);
  await expect.element(page.getByText('2')).toBeAttached();
});

test.skip('forwards Ark value commit details on blur and Enter', async () => {
  const commits: Array<{ value: string }> = [];
  const Harness = {
    components: numberInputComponents,
    setup() {
      return { commits };
    },
    template: `
      <NumberInput default-value="2" @value-commit="commits.push($event)">
        <NumberInputLabel>Amount</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <button type="button">After input</button>
    `,
  };

  render(Harness);
  const input = page.getByRole('spinbutton', { name: 'Amount' });
  await input.click();
  await input.fill('3');
  await page.getByRole('button', { name: 'After input' }).click();
  await expect.poll(() => commits).toEqual([{ value: '3', valueAsNumber: 3 }]);
  await input.fill('4');
  await input.press('Enter');
  await expect
    .poll(() => commits)
    .toEqual([
      { value: '3', valueAsNumber: 3 },
      { value: '4', valueAsNumber: 4 },
    ]);
});