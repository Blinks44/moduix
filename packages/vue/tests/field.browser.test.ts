import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Field,
  Fieldset,
  FieldRequiredIndicator,
  Input,
  FieldContext,
  FieldErrorText,
  FieldHelperText,
  FieldItem,
  FieldLabel,
  FieldRootProvider,
  useField,
  useFieldContext,
} from '../src';

const fieldComponents = {
  Field,
  Input,
  FieldRequiredIndicator,
  FieldContext,
  FieldErrorText,
  FieldHelperText,
  FieldItem,
  FieldLabel,
  FieldRootProvider,
};

test('wires labels, descriptions, errors, and field state to a native control', async () => {
  render({
    components: fieldComponents,
    template: `
      <Field disabled id="email" invalid read-only required data-probe="root">
        <FieldLabel>Email</FieldLabel>
        <Input />
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
  await expect
    .poll(() => input.getAttribute('aria-describedby')?.split(' '))
    .toEqual(expect.arrayContaining([helperText.id, errorText.id]));
  await expect.element(inputLocator).toHaveAttribute('required');
  await expect.element(inputLocator).toHaveAttribute('readonly');
  await expect.element(page.getByText('Email', { exact: true })).toHaveAttribute('for', input.id);
  await expect.element(page.getByRole('group')).toHaveAttribute('data-slot', 'field-root');
  await expect.element(page.getByRole('group')).toHaveAttribute('data-probe', 'root');
});

test('renders error text only while invalid', async () => {
  const invalid = ref(false);
  render({
    components: fieldComponents,
    setup: () => ({ invalid }),
    template: `<Field :invalid="invalid"><Input aria-label="Email" /><FieldErrorText>Enter a valid email address.</FieldErrorText></Field>`,
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
          <Input />
        </FieldItem>
      </Field>
    `,
  });

  const input = screen.getByRole('textbox', { name: 'Email' });
  expect(itemRef.value?.$el?.getAttribute('data-slot')).toBe('field-item');
  await expect.element(page.getByText('Email', { exact: true })).toHaveAttribute('for', input.id);
});

test('forwards refs and styling hooks for every part', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const labelRef = ref<ComponentPublicInstance>();
  const helperRef = ref<ComponentPublicInstance>();
  const errorRef = ref<ComponentPublicInstance>();
  const indicatorRef = ref<ComponentPublicInstance>();

  render({
    components: fieldComponents,
    setup() {
      return { errorRef, helperRef, indicatorRef, labelRef, rootRef };
    },
    template: `
      <Field ref="rootRef" invalid required>
        <FieldLabel ref="labelRef">Name <FieldRequiredIndicator ref="indicatorRef" /></FieldLabel>
        <Input />
        <FieldHelperText ref="helperRef">Shown on your profile.</FieldHelperText>
        <FieldErrorText ref="errorRef">Enter a name.</FieldErrorText>
      </Field>
    `,
  });

  expect(rootRef.value?.$el?.getAttribute('data-slot')).toBe('field-root');
  expect(labelRef.value?.$el?.getAttribute('data-slot')).toBe('field-label');
  expect(indicatorRef.value?.$el?.getAttribute('data-slot')).toBe('field-required-indicator');
  expect(helperRef.value?.$el?.getAttribute('data-slot')).toBe('field-helper-text');
  expect(errorRef.value?.$el?.getAttribute('data-slot')).toBe('field-error-text');
});

test('dims a disabled field once, also inside a disabled Fieldset', () => {
  render({
    components: { ...fieldComponents, Fieldset },
    template: `
      <Field disabled data-testid="disabled-field">
        <FieldLabel>Name</FieldLabel>
        <Input data-testid="disabled-field-input" />
      </Field>
      <Fieldset disabled>
        <Field data-testid="nested-field">
          <FieldLabel>Email</FieldLabel>
          <Input />
        </Field>
      </Fieldset>
    `,
  });

  const opacity = (testId: string) => getComputedStyle(screen.getByTestId(testId)).opacity;

  expect(opacity('disabled-field')).toBe('0.5');
  expect(opacity('disabled-field-input')).toBe('1');
  expect(opacity('nested-field')).toBe('1');
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
        <Input />
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
          <Input />
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

test('keeps controlled field props reactive', async () => {
  const { rerender } = render(
    {
      props: { requiredState: Boolean },
      components: fieldComponents,
      template: `
      <Field :required="requiredState">
        <Input aria-label="Project key" />
      </Field>
    `,
    },
    { props: { requiredState: false } },
  );

  await expect
    .element(page.getByRole('textbox', { name: 'Project key', exact: true }))
    .not.toHaveAttribute('required');
  await rerender({ requiredState: true });
  await expect
    .element(page.getByRole('textbox', { name: 'Project key', exact: true }))
    .toHaveAttribute('required');
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
    await expect.element(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Initial name');
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
import SsrField from './fixtures/SsrField.vue';