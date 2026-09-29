import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Field,
  FieldErrorText,
  PinInput,
  PinInputContext,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputInputs,
  PinInputLabel,
  PinInputRootProvider,
  PinInputSeparator,
  usePinInput,
} from '../src';

const pinInputComponents = {
  Field,
  FieldErrorText,
  PinInput,
  PinInputContext,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputInputs,
  PinInputLabel,
  PinInputRootProvider,
  PinInputSeparator,
} as unknown as Record<string, Component>;

function paste(input: HTMLElement, value: string) {
  const event = new Event('paste', { bubbles: true, cancelable: true });

  Object.defineProperty(event, 'clipboardData', {
    value: {
      getData: () => value,
    },
  });

  input.dispatchEvent(event);
}

test('renders the recommended composition with Ark anatomy and form participation', () => {
  const App = defineComponent({
    components: pinInputComponents,
    template: `
      <form>
        <PinInput :count="4" :default-value="['1', '2', '3', '4']" name="code" required>
          <PinInputLabel>Verification code</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
          <PinInputHiddenInput />
        </PinInput>
      </form>
    `,
  });

  const { container } = render(App);
  const form = container.querySelector('form');
  const inputs = screen.getAllByRole('textbox');
  const root = container.querySelector('[data-slot="pin-input-root"]');

  expect(inputs).toHaveLength(4);
  expect(inputs[0]).toHaveAttribute('data-slot', 'pin-input-input');
  expect(root).toHaveAttribute('data-scope', 'pin-input');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(screen.getByText('Verification code')).toHaveAttribute('data-slot', 'pin-input-label');
  expect(container.querySelector('input[aria-hidden="true"]')).not.toBeNull();
  expect(new FormData(form!).get('code')).toBe('1234');
});

test('distributes pasted values through controlled v-model and forwards one value event', async () => {
  const value = ref<string[]>([]);
  const changes: string[] = [];
  const App = defineComponent({
    components: pinInputComponents,
    setup: () => ({ changes, value }),
    template: `
      <PinInput
        v-model="value"
        :count="4"
        type="alphanumeric"
        @value-change="changes.push($event.valueAsString)"
      >
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl><PinInputInputs /></PinInputControl>
      </PinInput>
      <output>{{ value.join('') }}</output>
    `,
  });

  render(App);
  const [firstInput] = screen.getAllByRole('textbox');
  firstInput.focus();
  await fireEvent.focusIn(firstInput);
  paste(firstInput, '1234');

  await waitFor(() => {
    expect(screen.getAllByRole('textbox').map((input) => input.getAttribute('value'))).toEqual([
      '1',
      '2',
      '3',
      '4',
    ]);
  });
  expect(value.value).toEqual(['1', '2', '3', '4']);
  expect(changes.at(-1)).toBe('1234');
});

test('keeps invalid, disabled, and read-only Field state on visible inputs', () => {
  const App = defineComponent({
    components: pinInputComponents,
    template: `
      <Field disabled invalid read-only>
        <PinInput :count="4">
          <PinInputLabel>Verification code</PinInputLabel>
          <PinInputControl><PinInputInputs /></PinInputControl>
        </PinInput>
        <FieldErrorText>Enter a valid code.</FieldErrorText>
      </Field>
    `,
  });

  render(App);

  for (const input of screen.getAllByRole('textbox')) {
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('readonly');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  }
  expect(screen.getByText('Enter a valid code.')).toBeVisible();
});

test('submits the owning form after completing an auto-submit PinInput', async () => {
  let submittedCode = '';
  const App = defineComponent({
    components: pinInputComponents,
    setup: () => ({
      handleSubmit: (event: SubmitEvent) => {
        event.preventDefault();
        submittedCode = new FormData(event.currentTarget as HTMLFormElement).get('code') as string;
      },
    }),
    template: `
      <form @submit="handleSubmit">
        <PinInput auto-submit :count="4" name="code">
          <PinInputLabel>Verification code</PinInputLabel>
          <PinInputControl><PinInputInputs /></PinInputControl>
          <PinInputHiddenInput />
        </PinInput>
      </form>
    `,
  });

  render(App);
  const [firstInput] = screen.getAllByRole('textbox');
  firstInput.focus();
  await fireEvent.focusIn(firstInput);
  paste(firstInput, '1234');

  await waitFor(() => expect(submittedCode).toBe('1234'));
});

test('preserves RootProvider, context, refs, attrs, and asChild composition', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const inputRef = ref<ComponentPublicInstance>();
  const App = defineComponent({
    components: pinInputComponents,
    setup() {
      const pinInput = usePinInput({ count: 4, defaultValue: ['1'] });
      return { inputRef, pinInput, rootRef };
    },
    template: `
      <PinInputRootProvider :value="pinInput" data-probe="provider">
        <PinInputLabel>Provider code</PinInputLabel>
        <PinInputControl>
          <PinInputInput ref="inputRef" :index="0" />
          <PinInputInputs class="provider-inputs" />
        </PinInputControl>
        <PinInputHiddenInput />
        <PinInputContext v-slot="context">
          <output>Provider value: {{ context.valueAsString }}</output>
        </PinInputContext>
      </PinInputRootProvider>
      <button type="button" @click="pinInput.clearValue">Clear code</button>
      <PinInput ref="rootRef" as-child :count="4" data-probe="root">
        <section aria-label="Custom code">
          <PinInputLabel>Custom code</PinInputLabel>
          <PinInputControl><PinInputInputs /></PinInputControl>
          <PinInputHiddenInput />
        </section>
      </PinInput>
    `,
  });

  render(App);

  expect(rootRef.value?.$el).toBe(screen.getByRole('region', { name: 'Custom code' }));
  expect(rootRef.value?.$el).toHaveAttribute('data-slot', 'pin-input-root');
  expect(rootRef.value?.$el).toHaveAttribute('data-probe', 'root');
  expect(inputRef.value?.$el).toHaveAttribute('data-slot', 'pin-input-input');
  expect(screen.getByText('Provider value: 1')).toBeInTheDocument();

  await fireEvent.click(screen.getByRole('button', { name: 'Clear code' }));
  await waitFor(() => {
    expect(screen.getByText('Provider value:')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')[0]).toHaveValue('');
  });
});

test('applies native utilities to component-owned parts', () => {
  const App = defineComponent({
    components: pinInputComponents,
    template: `
      <PinInput :count="4">
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
          <PinInputSeparator />
        </PinInputControl>
      </PinInput>
    `,
  });

  const { container } = render(App);

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
  const App = defineComponent({
    components: pinInputComponents,
    template: `
      <PinInput class="w-80 max-w-sm gap-4">
        <PinInputLabel class="text-lg text-primary">Verification code</PinInputLabel>
        <PinInputControl class="gap-4">
          <PinInputInput
            class="h-12 w-40 rounded-lg border-2 bg-muted px-2 py-1 text-primary"
            :index="0"
          />
          <PinInputSeparator class="size-8 text-primary" />
        </PinInputControl>
      </PinInput>
    `,
  });

  const { container } = render(App);
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

test('renders and hydrates generated ids consistently', async () => {
  const App = defineComponent({
    components: pinInputComponents,
    template: `
      <PinInput :count="4">
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl><PinInputInputs /></PinInputControl>
      </PinInput>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="pin-input-root"');
  expect(html).toContain('data-slot="pin-input-input"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const app = createSSRApp(App);
  app.mount(host);
  expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
  app.unmount();
  host.remove();
});