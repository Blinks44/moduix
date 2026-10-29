import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Field,
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
} from '@/index';
import SsrField from './fixtures/SsrField.vue';

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