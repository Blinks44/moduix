import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Field,
  Input,
  FieldContext,
  FieldErrorText,
  FieldHelperText,
  FieldInput,
  FieldItem,
  FieldLabel,
  FieldRootProvider,
  FieldSelect,
  FieldTextarea,
  useField,
  useFieldContext,
} from '../src';

test('keeps FieldInput native size distinct from Input visual size', async () => {
  render({
    components: { FieldInput, Input },
    template: `
      <FieldInput aria-label="Field input" :size="8" disabled aria-invalid="true" />
      <Input aria-label="Input" size="md" :html-size="8" disabled aria-invalid="true" />
    `,
  });

  const fieldInput = screen.getByRole('textbox', { name: 'Field input' });
  const input = screen.getByRole('textbox', { name: 'Input' });

  const fieldInputLocator = page.getByRole('textbox', { name: 'Field input', exact: true });
  await expect.element(fieldInputLocator).toHaveAttribute('size', '8');
  const inputLocator = page.getByRole('textbox', { name: 'Input', exact: true });
  await expect.element(inputLocator).toHaveAttribute('size', '8');
  await expect.element(fieldInputLocator).toHaveAttribute('data-slot', 'field-input');
  await expect.element(fieldInputLocator).not.toHaveAttribute('data-size');
  await expect.element(inputLocator).toHaveAttribute('data-size', 'md');
  await expect.element(fieldInputLocator).toBeDisabled();
  await expect.element(inputLocator).toBeDisabled();
  await expect.element(fieldInputLocator).toHaveAttribute('aria-invalid', 'true');
  await expect.element(inputLocator).toHaveAttribute('aria-invalid', 'true');

  const inputClasses = new Set(input.classList);
  inputClasses.delete('w-auto');
  inputClasses.add('w-full');
  expect(new Set(fieldInput.classList)).toEqual(inputClasses);
  expect([...fieldInput.classList]).toEqual(
    expect.arrayContaining([
      'px-3',
      'max-w-none',
      'aria-invalid:border-destructive',
      'aria-invalid:focus-visible:outline-destructive',
      'file:bg-primary',
      'disabled:opacity-50',
      '[[data-slot=field-root][data-disabled]_&]:opacity-100',
      '[[data-slot=field-root-provider][data-disabled]_&]:opacity-100',
    ]),
  );
});

const fieldComponents = {
  Field,
  FieldContext,
  FieldErrorText,
  FieldHelperText,
  FieldInput,
  FieldItem,
  FieldLabel,
  FieldRootProvider,
  FieldSelect,
  FieldTextarea,
};

test('wires labels, descriptions, errors, and field state to a native control', async () => {
  render({
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
  const input = screen.getByRole('textbox', { name: 'Email' });
  const helperText = screen.getByText('Use your work email.');
  const errorText = screen.getByText('Enter a valid email address.');
  const inputLocator = page.getByRole('textbox', { name: 'Email', exact: true });
  await expect.element(inputLocator).toBeDisabled();
  await expect.element(inputLocator).toHaveAttribute('aria-invalid', 'true');
  await expect.poll(() => input.getAttribute('aria-describedby')).toContain(helperText.id);
  await expect.element(inputLocator).toHaveAttribute('aria-errormessage', errorText.id);
  await expect.element(inputLocator).toHaveAttribute('required');
  await expect.element(inputLocator).toHaveAttribute('readonly');
  await expect.element(page.getByText('Email', { exact: true })).toHaveAttribute('for', input.id);
});

test('renders error text only while invalid', async () => {
  const invalid = ref(false);
  render({
    components: fieldComponents,
    setup: () => ({ invalid }),
    template: `<Field :invalid="invalid"><FieldInput aria-label="Email" /><FieldErrorText>Enter a valid email address.</FieldErrorText></Field>`,
  });
  await expect
    .element(page.getByText('Enter a valid email address.', { exact: true }))
    .toHaveCount(0);
  invalid.value = true;
  await expect
    .element(page.getByText('Enter a valid email address.', { exact: true }))
    .toHaveAttribute('aria-live', 'polite');
});
test('forwards FieldItem refs and uses target for its label wiring', async () => {
  const itemRef = ref<ComponentPublicInstance>();

  render({
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
  const input = screen.getByRole('textbox', { name: 'Email' });
  expect(itemRef.value?.$el?.getAttribute('data-slot')).toBe('field-item');
  await expect.element(page.getByText('Email', { exact: true })).toHaveAttribute('for', input.id);
});

test('forwards refs and styling hooks for the Ark native parts', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const inputRef = ref<ComponentPublicInstance>();
  const textareaRef = ref<ComponentPublicInstance>();
  const selectRef = ref<ComponentPublicInstance>();

  render({
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
  expect(rootRef.value?.$el?.getAttribute('data-slot')).toBe('field-root');
  expect(inputRef.value?.$el?.getAttribute('data-slot')).toBe('field-input');
  expect(textareaRef.value?.$el?.getAttribute('data-slot')).toBe('field-textarea');
  expect(selectRef.value?.$el?.getAttribute('data-slot')).toBe('field-select');
});

test.each([
  ['input', false],
  ['input', true],
  ['textarea', false],
  ['textarea', true],
  ['select', false],
  ['select', true],
] as const)('preserves controlled native models (%s, asChild=%s)', async (tag, asChild) => {
  const value = ref('initial');
  const controlRef = ref<ComponentPublicInstance>();
  const changes: string[] = [];
  const nativeEvent = rs.fn();
  const options =
    tag === 'select'
      ? '<option value="initial">Initial</option><option value="next">Next</option><option value="parent">Parent</option>'
      : '';

  render({
    components: {
      Control: { input: FieldInput, textarea: FieldTextarea, select: FieldSelect }[tag],
    },
    setup: () => ({ asChild, changes, controlRef, nativeEvent, value }),
    template: `
      <form aria-label="Field form">
        <Control
          ref="controlRef"
          v-model="value"
          :as-child="asChild"
          aria-label="Value"
          name="value"
          @${tag === 'select' ? 'change' : 'input'}="nativeEvent"
          @update:model-value="changes.push($event)"
        >${asChild ? `<${tag}>${options}</${tag}>` : options}</Control>
      </form>
    `,
  });
  const control = screen.getByRole(tag === 'select' ? 'combobox' : 'textbox', { name: 'Value' });
  const form = screen.getByRole('form', { name: 'Field form' }) as HTMLFormElement;
  const controlLocator = page.getByRole(tag === 'select' ? 'combobox' : 'textbox', {
    name: 'Value',
    exact: true,
  });

  expect(controlRef.value?.$el).toBe(control);
  await expect.element(controlLocator).toHaveValue('initial');
  if (tag === 'select') {
    await controlLocator.selectOption('next');
  } else {
    await controlLocator.fill('next');
  }

  await expect.element(controlLocator).toHaveValue('next');
  expect(value.value).toBe('next');
  expect(changes).toEqual(['next']);
  expect(nativeEvent).toHaveBeenCalledTimes(1);
  expect(new FormData(form).get('value')).toBe('next');

  value.value = 'parent';
  await expect.element(controlLocator).toHaveValue('parent');
  expect(changes).toEqual(['next']);
  expect(nativeEvent).toHaveBeenCalledTimes(1);
  expect(new FormData(form).get('value')).toBe('parent');
});

test('keeps the RootProvider composition path Ark-shaped', async () => {
  render({
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
  await expect
    .element(page.getByRole('textbox', { name: 'Email', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
  await expect
    .element(page.getByText('Enter a valid email address.', { exact: true }))
    .toBeVisible();
});

test('exposes the field context through the hook and renderless component', () => {
  const ContextValue = defineComponent({
    setup() {
      const field = useFieldContext();
      return { field };
    },
    template: '<output>{{ field.required ? "required" : "optional" }}</output>',
  });

  render({
    components: { ...fieldComponents, ContextValue },
    template: `
      <Field required>
        <FieldContext v-slot="field"><output>{{ field.required ? 'required' : 'optional' }}</output></FieldContext>
        <ContextValue />
      </Field>
    `,
  });
  expect(screen.getAllByText('required')).toHaveLength(2);
});

test('preserves Ark asChild composition and forwards refs for the root', async () => {
  const rootRef = ref<ComponentPublicInstance>();

  render({
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
  const root = screen.getByRole('group', { name: 'Email field' });
  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('group', { name: 'Email field', exact: true }))
    .toHaveAttribute('data-slot', 'field-root');
  expect(rootRef.value?.$el).toBe(root);
  await expect.element(page.getByRole('textbox', { name: 'Email', exact: true })).toBeVisible();
});

// Ark Vue 5.39.2 declares native defaultValue props but drops them in FieldInput/FieldSelect.
test.skip('preserves native default values and reset behavior', async () => {
  render({
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
  const form = screen.getByRole('form', { name: 'Project form' }) as HTMLFormElement;

  const textbox = page.getByRole('textbox', { name: 'Project key', exact: true });
  await expect.element(textbox).toHaveValue('MAPS');
  await expect
    .element(page.getByRole('combobox', { name: 'Priority', exact: true }))
    .toHaveValue('normal');
  await textbox.fill('MODUIX');
  form.reset();
  await expect.element(textbox).toHaveValue('MAPS');
});

test('hydrates without replacing hosts or generated ids', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(SsrField));
  document.body.append(host);
  const serverRoot = host.querySelector('[data-slot="field-root"]');
  const serverIds = [...host.querySelectorAll('[id]')].map((element) => element.id);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(SsrField);
  try {
    app.mount(host);
    await nextTick();
    expect(host.querySelectorAll('[data-slot="field-root"]')).toHaveLength(1);
    expect(host.querySelector('[data-slot="field-root"]')).toBe(serverRoot);
    expect([...host.querySelectorAll('[id]')].map((element) => element.id)).toEqual(serverIds);
    await page.getByRole('textbox', { name: 'Name' }).fill('Hydrated value');
    await expect.element(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Hydrated value');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});
test('applies native utilities and lets consumer classes win', async () => {
  const { container } = render({
    components: fieldComponents,
    template: `
      <Field class="w-80 max-w-sm gap-4 text-primary">
        <FieldLabel class="gap-4 text-primary">Name</FieldLabel>
        <FieldInput class="w-80 rounded-lg bg-muted px-0 text-primary" />
        <FieldTextarea />
        <FieldSelect><option>Normal</option></FieldSelect>
        <FieldHelperText>Use your work email.</FieldHelperText>
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
      </Field>
    `,
  });
  const root = container.querySelector('[data-slot="field-root"]')!;
  const label = container.querySelector('[data-slot="field-label"]')!;
  const input = container.querySelector('[data-slot="field-input"]')!;
  expect([...root.classList]).toEqual(
    expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4', 'text-primary']),
  );
  expect(
    ['w-full', 'max-w-none', 'gap-1', 'text-foreground'].some((name) =>
      root.classList.contains(name),
    ),
  ).toBe(false);
  expect([...label.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect([...input.classList]).toEqual(
    expect.arrayContaining(['w-80', 'rounded-lg', 'bg-muted', 'px-0', 'text-primary']),
  );
  expect([...container.querySelector('[data-slot="field-textarea"]')!.classList]).toEqual(
    expect.arrayContaining(['min-h-20', 'resize-y']),
  );
  expect([...container.querySelector('[data-slot="field-helper-text"]')!.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'text-muted-foreground']),
  );
  await expect.element(page.locator('[data-slot="field-root"]')).toHaveCSS('gap', '16px');
  await expect.element(page.locator('[data-slot="field-input"]')).toHaveCSS('width', '320px');
  await expect.element(page.locator('[data-slot="field-input"]')).toHaveCSS('padding-left', '0px');
  await expect
    .element(page.locator('[data-slot="field-input"]'))
    .toHaveCSS('border-radius', '10px');
});
import SsrField from './fixtures/SsrField.vue';