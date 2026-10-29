import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import {
  Field,
  FieldErrorText,
  FieldHelperText,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
} from '@/index';

test('applies native utilities to component-owned parts', async () => {
  render(
    <Field required>
      <FieldItem value="name">
        <FieldLabel>
          Name
          <FieldRequiredIndicator>*</FieldRequiredIndicator>
        </FieldLabel>
        <FieldHelperText>Use your work email.</FieldHelperText>
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
      </FieldItem>
    </Field>,
  );

  await expect.element(page.locator('[data-slot="field-error-text"]')).toHaveCount(0);
});

test('lets consumer utilities replace component defaults', async () => {
  const { container } = render(
    <Field className="w-80 max-w-sm gap-4 text-primary">
      <FieldLabel className="gap-4 text-primary">Name</FieldLabel>
    </Field>,
  );

  const root = container.querySelector('[data-slot="field-root"]')!;
  const label = container.querySelector('[data-slot="field-label"]')!;

  expect([...root.classList]).toEqual(
    expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4', 'text-primary']),
  );
  expect([...label.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  await expect.element(page.locator('[data-slot="field-root"]')).toHaveCSS('gap', '16px');
});