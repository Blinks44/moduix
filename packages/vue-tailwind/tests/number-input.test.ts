import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
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

test('preserves Ark anatomy, accessible naming, forwarded attributes, refs, and trigger defaults', () => {
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
  const label = screen.getByText('Amount');
  const scrubber = screen.getByText('Adjust value');
  const control = screen.getByRole('spinbutton', { name: 'Amount' }).parentElement;
  const input = screen.getByRole('spinbutton', { name: 'Amount' });
  const decrement = screen.getByRole('button', { name: 'decrease value' });
  const increment = screen.getByRole('button', { name: 'increment value' });
  const valueText = document.querySelector('[data-slot="number-input-value-text"]');

  expect(root).toHaveAttribute('data-scope', 'number-input');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'number-input-root');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(label).toHaveAttribute('data-part', 'label');
  expect(label).toHaveAttribute('data-slot', 'number-input-label');
  expect(scrubber).toHaveAttribute('data-part', 'scrubber');
  expect(scrubber).toHaveAttribute('data-slot', 'number-input-scrubber');
  expect(fieldRef.value?.$el).toHaveAttribute('data-part', 'control');
  expect(fieldRef.value?.$el).toHaveAttribute('data-slot', 'number-input-control');
  expect(control).toBe(fieldRef.value?.$el);
  expect(input).toHaveAttribute('data-part', 'input');
  expect(input).toHaveAttribute('data-slot', 'number-input-input');
  expect(input).toHaveAttribute('aria-valuenow', '2');
  expect(decrement).toHaveAttribute('data-part', 'decrement-trigger');
  expect(decrement).toHaveAttribute('data-slot', 'number-input-decrement-trigger');
  expect(increment).toHaveAttribute('data-part', 'increment-trigger');
  expect(increment).toHaveAttribute('data-slot', 'number-input-increment-trigger');
  expect(decrement.querySelector('svg')).toBeInTheDocument();
  expect(increment.querySelector('svg')).toBeInTheDocument();
  expect(valueText).toHaveAttribute('data-part', 'value-text');
  expect(valueText).toHaveAttribute('data-slot', 'number-input-value-text');
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
  const input = screen.getByRole('spinbutton', { name: 'Amount' });

  input.focus();
  await fireEvent.focusIn(input);
  const root = input.closest('[data-slot="number-input-root"]');
  await waitFor(() => expect(root).toHaveAttribute('data-focus'));
  await fireEvent.keyDown(input, { key: 'ArrowUp' });

  await waitFor(() => expect(input).toHaveValue('3'));
  expect(screen.getByText('3', { selector: 'output' })).toBeInTheDocument();
  expect(valueChanges).toHaveLength(1);
  expect(valueChanges[0]).toMatchObject({ value: '3', valueAsNumber: 3 });
  expect(focusChanges).toHaveLength(1);
  expect(focusChanges[0]).toMatchObject({ focused: true });
});

test('inherits Field state for disabled, read-only, and invalid number inputs', () => {
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
  const input = screen.getByRole('spinbutton', { name: 'Items' });

  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('readonly');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('button', { name: 'decrease value' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'increment value' })).toBeDisabled();
  expect(screen.getByText('Value must be in range.')).toBeVisible();
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
  const input = screen.getByRole('spinbutton', { name: 'Items' });
  input.focus();
  await fireEvent.focusIn(input);
  await fireEvent.update(input, '11');
  input.blur();
  await fireEvent.blur(input);

  await waitFor(() => expect(invalidDetails).toHaveLength(1));
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
  expect(screen.getByRole('spinbutton', { name: 'Guests' })).toHaveValue('3');
  expect(screen.getByText('3', { selector: 'output' })).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Set maximum' }));
  await waitFor(() => expect(screen.getByRole('spinbutton', { name: 'Guests' })).toHaveValue('10'));
  expect(screen.getByText('10', { selector: 'output' })).toBeInTheDocument();
});

test('preserves the root and part asChild hosts and Vue refs', () => {
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
  const decrement = screen.getByRole('button', { name: 'Decrease custom value' });

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'number-input-root');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(rootRef.value?.$el).toBe(root);
  expect(decrement).toHaveAttribute('data-slot', 'number-input-decrement-trigger');
  expect(decrement).toHaveAttribute('data-part', 'decrement-trigger');
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

test('renders stable spinbutton ids through server rendering and hydration', async () => {
  const html = await renderToString(createSSRApp(NumberInputSsrConsumer));
  expect(html).toContain('data-slot="number-input-root"');
  expect(html).toContain('role="spinbutton"');
  expect(html).toContain('aria-valuenow="7"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const input = host.querySelector('[role="spinbutton"]');
  const serverId = input?.id;
  const serverLabelId = input?.getAttribute('aria-labelledby');
  const app = createSSRApp(NumberInputSsrConsumer);
  app.mount(host);

  expect(host.querySelector('[role="spinbutton"]')?.id).toBe(serverId);
  expect(host.querySelector('[role="spinbutton"]')?.getAttribute('aria-labelledby')).toBe(
    serverLabelId,
  );

  app.unmount();
  host.remove();
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

// Ark Vue 5.39.2 does not declare or forward onValueCommit and renders no default value text.
test.skip('renders the formatted value in NumberInputValueText', () => {
  const Harness = {
    components: numberInputComponents,
    template: `
      <NumberInput default-value="2">
        <NumberInputValueText />
      </NumberInput>
    `,
  };

  render(Harness);
  expect(screen.getByText('2')).toBeInTheDocument();
});

test.skip('forwards Ark value commit details on blur and Enter', () => {
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
    `,
  };

  render(Harness);
  expect(commits).toEqual([]);
});