import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
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
} from '@/index';

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

test('applies native utilities and lets consumer classes win', async () => {
  const { container } = render({
    components: fieldComponents,
    template: `
      <Field class="w-80 max-w-sm gap-4 text-primary">
        <FieldLabel class="gap-4 text-primary">Name</FieldLabel>
        <FieldHelperText>Use your work email.</FieldHelperText>
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
      </Field>
    `,
  });
  const root = container.querySelector('[data-slot="field-root"]')!;
  const label = container.querySelector('[data-slot="field-label"]')!;
  expect([...root.classList]).toEqual(
    expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4', 'text-primary']),
  );
  expect([...label.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  await expect.element(page.locator('[data-slot="field-root"]')).toHaveCSS('gap', '16px');
});