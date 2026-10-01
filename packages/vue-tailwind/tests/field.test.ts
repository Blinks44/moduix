import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Field,
  Input,
  FieldContext,
  FieldErrorText,
  FieldHelperText,
  FieldInput,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
  FieldSelect,
  FieldTextarea,
  useField,
  useFieldContext,
} from '../src';

test('keeps FieldInput native size distinct from Input visual size', () => {
  render({
    components: { FieldInput, Input } as unknown as Record<string, Component>,
    template: `
      <FieldInput aria-label="Field input" :size="8" disabled aria-invalid="true" />
      <Input aria-label="Input" size="md" :html-size="8" disabled aria-invalid="true" />
    `,
  });

  const fieldInput = screen.getByRole('textbox', { name: 'Field input' });
  const input = screen.getByRole('textbox', { name: 'Input' });

  expect(fieldInput).toHaveAttribute('size', '8');
  expect(input).toHaveAttribute('size', '8');
  expect(fieldInput).toHaveAttribute('data-slot', 'field-input');
  expect(fieldInput).not.toHaveAttribute('data-size');
  expect(input).toHaveAttribute('data-size', 'md');
  expect(fieldInput).toBeDisabled();
  expect(input).toBeDisabled();
  expect(fieldInput).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAttribute('aria-invalid', 'true');

  const inputClasses = new Set(input.classList);
  inputClasses.delete('w-auto');
  inputClasses.add('w-full');
  expect(new Set(fieldInput.classList)).toEqual(inputClasses);
  expect(fieldInput).toHaveClass(
    'px-3',
    'max-w-none',
    'aria-invalid:border-destructive',
    'aria-invalid:focus-visible:outline-destructive',
    'file:bg-primary',
    'disabled:opacity-50',
    '[[data-slot=field-root][data-disabled]_&]:opacity-100',
    '[[data-slot=field-root-provider][data-disabled]_&]:opacity-100',
  );
});

const fieldComponents: Record<string, Component> = {
  Field,
  FieldContext,
  FieldErrorText,
  FieldHelperText,
  FieldInput: FieldInput as Component,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
  FieldSelect,
  FieldTextarea,
};

test('wires labels, descriptions, errors, and field state to a native control', async () => {
  const Harness = defineComponent({
    components: fieldComponents,
    template: `
      <Field disabled id="email" invalid read-only required data-probe="root">
        <FieldLabel>Email</FieldLabel>
        <FieldInput />
        <FieldHelperText>Use your work email.</FieldHelperText>
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
      </Field>
    `,
  });

  render(Harness);
  const input = screen.getByRole('textbox', { name: 'Email' });
  const helperText = screen.getByText('Use your work email.');
  const errorText = screen.getByText('Enter a valid email address.');
  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('aria-invalid', 'true');
  await waitFor(() => expect(input.getAttribute('aria-describedby')).toContain(helperText.id));
  expect(input).toHaveAttribute('aria-errormessage', errorText.id);
  expect(input).toBeRequired();
  expect(input).toHaveAttribute('readonly');
  expect(screen.getByText('Email')).toHaveAttribute('for', input.id);
});

test('renders error text only while invalid', async () => {
  const Harness = defineComponent({
    components: fieldComponents,
    setup() {
      const invalid = ref(false);
      return { invalid };
    },
    template: `
      <Field :invalid="invalid">
        <FieldInput aria-label="Email" />
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
      </Field>
    `,
  });

  const { rerender } = render(Harness);
  expect(screen.queryByText('Enter a valid email address.')).not.toBeInTheDocument();
  await rerender({ invalid: true });
  await waitFor(() =>
    expect(screen.getByText('Enter a valid email address.')).toHaveAttribute('aria-live', 'polite'),
  );
});

test('forwards FieldItem refs and uses target for its label wiring', () => {
  const itemRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: fieldComponents,
    setup() {
      return { itemRef };
    },
    template: `
      <Field id="contact" target="email">
        <FieldItem ref="itemRef" value="email">
          <FieldLabel>Email</FieldLabel>
          <FieldInput />
        </FieldItem>
      </Field>
    `,
  });

  render(Harness);
  const input = screen.getByRole('textbox', { name: 'Email' });
  expect(itemRef.value?.$el).toHaveAttribute('data-slot', 'field-item');
  expect(screen.getByText('Email')).toHaveAttribute('for', input.id);
});

test('forwards refs and styling hooks for the Ark native parts', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const inputRef = ref<ComponentPublicInstance>();
  const textareaRef = ref<ComponentPublicInstance>();
  const selectRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: fieldComponents,
    setup() {
      return { inputRef, rootRef, selectRef, textareaRef };
    },
    template: `
      <Field ref="rootRef">
        <FieldLabel>Name</FieldLabel>
        <FieldInput ref="inputRef" />
      </Field>
      <Field>
        <FieldLabel>Summary</FieldLabel>
        <FieldTextarea ref="textareaRef" />
      </Field>
      <Field>
        <FieldLabel>Priority</FieldLabel>
        <FieldSelect ref="selectRef"><option>Normal</option></FieldSelect>
      </Field>
    `,
  });

  render(Harness);
  expect(rootRef.value?.$el).toHaveAttribute('data-slot', 'field-root');
  expect(inputRef.value?.$el).toHaveAttribute('data-slot', 'field-input');
  expect(textareaRef.value?.$el).toHaveAttribute('data-slot', 'field-textarea');
  expect(selectRef.value?.$el).toHaveAttribute('data-slot', 'field-select');
});

test('keeps the RootProvider composition path Ark-shaped', () => {
  const Harness = defineComponent({
    components: fieldComponents,
    setup() {
      return { field: useField({ id: 'provider-email', invalid: true }) };
    },
    template: `
      <FieldRootProvider :value="field">
        <FieldLabel>Email</FieldLabel>
        <FieldInput />
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
      </FieldRootProvider>
    `,
  });

  render(Harness);
  expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByText('Enter a valid email address.')).toBeVisible();
});

test('exposes the field context through the hook and renderless component', () => {
  const ContextValue = defineComponent({
    setup() {
      const field = useFieldContext();
      return { field };
    },
    template: '<output>{{ field.required ? "required" : "optional" }}</output>',
  });
  const Harness = defineComponent({
    components: { ...fieldComponents, ContextValue },
    template: `
      <Field required>
        <FieldContext v-slot="field"><output>{{ field.required ? 'required' : 'optional' }}</output></FieldContext>
        <ContextValue />
      </Field>
    `,
  });

  render(Harness);
  expect(screen.getAllByText('required')).toHaveLength(2);
});

test('preserves Ark asChild composition and forwards refs for the root', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: fieldComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <Field ref="rootRef" as-child>
        <section aria-label="Email field">
          <FieldLabel>Email</FieldLabel>
          <FieldInput />
        </section>
      </Field>
    `,
  });

  render(Harness);
  const root = screen.getByRole('group', { name: 'Email field' });
  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'field-root');
  expect(rootRef.value?.$el).toBe(root);
  expect(screen.getByRole('textbox', { name: 'Email' })).toBeVisible();
});

// Ark Vue 5.39.2 declares native defaultValue props but drops them in FieldInput/FieldSelect.
test.skip('preserves native default values and reset behavior', async () => {
  const Harness = defineComponent({
    components: fieldComponents,
    template: `
      <form aria-label="Project form">
        <Field><FieldInput aria-label="Project key" default-value="MAPS" name="project" /></Field>
        <Field>
          <FieldSelect aria-label="Priority" default-value="normal" name="priority">
            <option value="low">Low</option>
            <option value="normal">Normal</option>
          </FieldSelect>
        </Field>
      </form>
    `,
  });

  render(Harness);
  const form = screen.getByRole('form', { name: 'Project form' }) as HTMLFormElement;
  const input = screen.getByRole('textbox', { name: 'Project key' });
  const select = screen.getByRole('combobox', { name: 'Priority' });
  expect(input).toHaveValue('MAPS');
  expect(select).toHaveValue('normal');
  await fireEvent.input(input, { target: { value: 'MODUIX' } });
  form.reset();
  expect(input).toHaveValue('MAPS');
});

test('renders the public anatomy on the server and hydrates with stable ids', async () => {
  const App = defineComponent({
    components: fieldComponents,
    template: `
      <Field required>
        <FieldLabel>Name</FieldLabel>
        <FieldInput />
        <FieldHelperText>Use your public name.</FieldHelperText>
      </Field>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('data-slot="field-root"');
  expect(html).toContain('data-slot="field-label"');
  expect(html).toContain('data-slot="field-input"');
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

test('applies native utilities and lets consumer classes win', () => {
  const Harness = defineComponent({
    components: fieldComponents,
    template: `
      <Field class="w-80 max-w-sm gap-4 text-primary">
        <FieldLabel class="gap-4 text-primary">Name</FieldLabel>
        <FieldInput class="w-80 rounded-lg bg-muted px-0 text-primary" />
        <FieldTextarea />
        <FieldSelect><option>Normal</option></FieldSelect>
        <FieldHelperText>Use your work email.</FieldHelperText>
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
        <FieldRequiredIndicator />
      </Field>
    `,
  });

  const { container } = render(Harness);
  const root = container.querySelector('[data-slot="field-root"]');
  const label = container.querySelector('[data-slot="field-label"]');
  const input = container.querySelector('[data-slot="field-input"]');
  expect(root).toHaveClass('w-80', 'max-w-sm', 'gap-4', 'text-primary');
  expect(root).not.toHaveClass('w-full', 'max-w-none', 'gap-1', 'text-foreground');
  expect(label).toHaveClass('gap-4', 'text-primary');
  expect(input).toHaveClass('w-80', 'rounded-lg', 'bg-muted', 'px-0', 'text-primary');
  expect(container.querySelector('[data-slot="field-textarea"]')).toHaveClass(
    'min-h-20',
    'resize-y',
  );
  expect(container.querySelector('[data-slot="field-helper-text"]')).toHaveClass(
    'text-sm',
    'text-muted-foreground',
  );
});