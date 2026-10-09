import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
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
import SsrPinInput from './fixtures/SsrPinInput.vue';

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
} as Record<string, Component>;

function paste(input: HTMLElement, value: string) {
  const clipboardData = new DataTransfer();
  clipboardData.setData('text/plain', value);
  input.dispatchEvent(
    new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData }),
  );
}

test('renders the recommended composition with Ark anatomy and form participation', async () => {
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

  expect(inputs).toHaveLength(4);
  await expect
    .element(page.getByRole('textbox').nth(0))
    .toHaveAttribute('data-slot', 'pin-input-input');
  await expect
    .element(page.locator('[data-slot="pin-input-root"]'))
    .toHaveAttribute('data-scope', 'pin-input');
  await expect
    .element(page.locator('[data-slot="pin-input-root"]'))
    .toHaveAttribute('data-part', 'root');
  await expect
    .element(page.getByText('Verification code'))
    .toHaveAttribute('data-slot', 'pin-input-label');
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

  await page.getByRole('textbox').nth(0).click();
  await expect.element(page.getByRole('textbox').first()).toBeFocused();
  paste(document.querySelector<HTMLInputElement>('[data-slot="pin-input-input"]')!, '1234');

  await expect
    .poll(() => screen.getAllByRole('textbox').map((input) => input.getAttribute('value')))
    .toEqual(['1', '2', '3', '4']);
  expect(value.value).toEqual(['1', '2', '3', '4']);
  expect(changes.at(-1)).toBe('1234');
});

test('forwards native hook emits once alongside prop callbacks', async () => {
  const emit = rs.fn();
  const onValueChange = rs.fn();
  const onValueComplete = rs.fn();
  const App = defineComponent({
    components: pinInputComponents,
    setup: () => ({
      pinInput: usePinInput({ count: 4, onValueChange, onValueComplete }, emit),
    }),
    template: `
      <PinInputRootProvider :value="pinInput">
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl><PinInputInputs /></PinInputControl>
      </PinInputRootProvider>
    `,
  });

  render(App);

  await page.getByRole('textbox').nth(0).click();
  await expect.element(page.getByRole('textbox').first()).toBeFocused();
  paste(document.querySelector<HTMLInputElement>('[data-slot="pin-input-input"]')!, '1234');

  await expect.poll(() => onValueComplete).toHaveBeenCalledTimes(1);
  expect(onValueChange).toHaveBeenCalledTimes(1);
  expect(emit.mock.calls.map(([event]) => event)).toEqual([
    'valueChange',
    'update:modelValue',
    'valueComplete',
  ]);
  expect(emit).toHaveBeenCalledWith('valueChange', onValueChange.mock.calls[0][0]);
  expect(emit).toHaveBeenCalledWith('update:modelValue', ['1', '2', '3', '4']);
  expect(emit).toHaveBeenCalledWith('valueComplete', onValueComplete.mock.calls[0][0]);
});

test('keeps invalid, disabled, and read-only Field state on visible inputs', async () => {
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
    expect(input?.matches(':disabled')).toBe(true);
    expect(input?.hasAttribute('readonly')).toBe(true);
    expect(input?.getAttribute('aria-invalid')).toBe('true');
  }
  await expect.element(page.getByText('Enter a valid code.')).toBeVisible();
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

  await page.getByRole('textbox').nth(0).click();
  await expect.element(page.getByRole('textbox').first()).toBeFocused();
  paste(document.querySelector<HTMLInputElement>('[data-slot="pin-input-input"]')!, '1234');

  await expect.poll(() => submittedCode).toBe('1234');
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
  expect(rootRef.value?.$el?.getAttribute('data-slot')).toBe('pin-input-root');
  expect(rootRef.value?.$el?.getAttribute('data-probe')).toBe('root');
  expect(inputRef.value?.$el?.getAttribute('data-slot')).toBe('pin-input-input');
  await expect.element(page.getByText('Provider value: 1')).toBeAttached();

  await page.getByRole('button', { name: 'Clear code', exact: true }).click();
  await expect.element(page.getByText('Provider value:')).toBeAttached();
  await expect.element(page.getByRole('textbox').nth(0)).toHaveValue('');
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

  expect([...container.querySelector('[data-slot="pin-input-root"]')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'w-auto',
      'max-w-none',
      'flex-col',
      'items-start',
      'gap-2',
    ]),
  );
  expect([...container.querySelector('[data-slot="pin-input-label"]')!.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'font-medium', 'text-foreground']),
  );
  expect([...container.querySelector('[data-slot="pin-input-control"]')!.classList]).toEqual(
    expect.arrayContaining(['inline-flex', 'items-center', 'gap-2']),
  );
  expect([...container.querySelector('[data-slot="pin-input-input"]')!.classList]).toEqual(
    expect.arrayContaining([
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
    ]),
  );
  expect([...container.querySelector('[data-slot="pin-input-separator"]')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'size-4',
      'flex-none',
      'items-center',
      'justify-center',
      'text-muted-foreground',
      'leading-none',
      'pointer-events-none',
    ]),
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

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4']));
  expect(['w-auto', 'max-w-none', 'gap-2'].some((name) => root?.classList.contains(name))).toBe(
    false,
  );
  expect([...label!.classList]).toEqual(expect.arrayContaining(['text-lg', 'text-primary']));
  expect(['text-sm', 'text-foreground'].some((name) => label?.classList.contains(name))).toBe(
    false,
  );
  expect([...control!.classList]).toEqual(expect.arrayContaining(['gap-4']));
  expect(control?.classList.contains('gap-2')).toBe(false);
  expect(getComputedStyle(input!).width).toBe('160px');
  expect(getComputedStyle(input!).height).toBe('48px');
  expect([...input!.classList]).toEqual(
    expect.arrayContaining([
      'h-12',
      'w-40',
      'rounded-lg',
      'border-2',
      'bg-muted',
      'px-2',
      'py-1',
      'text-primary',
    ]),
  );
  expect(
    ['rounded-md', 'border', 'bg-background', 'px-0', 'py-0', 'text-foreground'].some((name) =>
      input?.classList.contains(name),
    ),
  ).toBe(false);
  expect([...separator!.classList]).toEqual(expect.arrayContaining(['size-8', 'text-primary']));
  expect(
    ['size-4', 'text-muted-foreground'].some((name) => separator?.classList.contains(name)),
  ).toBe(false);
});

test('hydrates stable hosts and ids and remains interactive', async () => {
  const html = await renderToString(createSSRApp(SsrPinInput));
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const serverInput = host.querySelector('input');
  expect(serverInput).not.toBeNull();
  expect(serverIds.length).toBeGreaterThan(0);
  const app = createSSRApp(SsrPinInput);
  const input = page.getByRole('textbox');
  try {
    app.mount(host);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    expect(host.querySelector('input')).toBe(serverInput);
    await input.first().click();
    await expect.element(input.first()).toBeFocused();
    paste(document.querySelector<HTMLInputElement>('[data-slot="pin-input-input"]')!, '1234');
    for (let index = 0; index < 4; index++) {
      await expect.element(input.nth(index)).toHaveValue(String(index + 1));
    }
  } finally {
    app.unmount();
    host.remove();
  }
});