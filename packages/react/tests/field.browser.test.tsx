import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  Field,
  Fieldset,
  Input,
  useField,
  FieldErrorText,
  FieldHelperText,
  FieldItem,
  FieldLabel,
  FieldRequiredIndicator,
  FieldRootProvider,
} from '../src';

test('wires labels, descriptions, errors, and field state to a native control', async () => {
  render(
    <Field disabled id="email" invalid readOnly required>
      <FieldLabel>Email</FieldLabel>
      <Input />
      <FieldHelperText>Use your work email.</FieldHelperText>
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>,
  );

  const input = screen.getByRole('textbox', { name: 'Email' });
  const helperText = screen.getByText('Use your work email.');
  const errorText = screen.getByText('Enter a valid email address.');

  const inputLocator = page.getByRole('textbox', { name: 'Email', exact: true });
  await expect.element(inputLocator).toBeDisabled();
  await expect.element(inputLocator).toHaveAttribute('aria-invalid', 'true');
  expect(input.getAttribute('aria-describedby')).toContain(helperText.id);
  await expect
    .poll(() => input.getAttribute('aria-describedby')?.split(' '))
    .toEqual(expect.arrayContaining([helperText.id, errorText.id]));
  await expect.element(inputLocator).toHaveAttribute('required');
  await expect.element(inputLocator).toHaveAttribute('readonly');
  await expect.element(page.getByText('Email', { exact: true })).toHaveAttribute('for', input.id);
});

test('renders error text only while invalid', async () => {
  const { rerender } = render(
    <Field>
      <Input aria-label="Email" />
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>,
  );

  await expect
    .element(page.getByText('Enter a valid email address.', { exact: true }))
    .toHaveCount(0);

  rerender(
    <Field invalid>
      <Input aria-label="Email" />
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>,
  );

  await expect
    .element(page.getByText('Enter a valid email address.', { exact: true }))
    .toHaveAttribute('aria-live', 'polite');
});

test('forwards FieldItem refs and uses target for its label wiring', async () => {
  const itemRef = createRef<HTMLDivElement>();

  render(
    <Field id="contact" target="email">
      <FieldItem ref={itemRef} value="email">
        <FieldLabel>Email</FieldLabel>
        <Input />
      </FieldItem>
    </Field>,
  );

  const input = screen.getByRole('textbox', { name: 'Email' });

  expect(itemRef.current!.getAttribute('data-slot')).toBe('field-item');
  await expect.element(page.getByText('Email', { exact: true })).toHaveAttribute('for', input.id);
});

test('forwards refs and styling hooks for every part', () => {
  const rootRef = createRef<HTMLDivElement>();
  const labelRef = createRef<HTMLLabelElement>();
  const helperRef = createRef<HTMLSpanElement>();
  const errorRef = createRef<HTMLSpanElement>();
  const indicatorRef = createRef<HTMLSpanElement>();

  render(
    <Field ref={rootRef} invalid required>
      <FieldLabel ref={labelRef}>
        Name
        <FieldRequiredIndicator ref={indicatorRef} />
      </FieldLabel>
      <Input />
      <FieldHelperText ref={helperRef}>Shown on your profile.</FieldHelperText>
      <FieldErrorText ref={errorRef}>Enter a name.</FieldErrorText>
    </Field>,
  );

  expect(rootRef.current!.getAttribute('data-slot')).toBe('field-root');
  expect(labelRef.current!.getAttribute('data-slot')).toBe('field-label');
  expect(indicatorRef.current!.getAttribute('data-slot')).toBe('field-required-indicator');
  expect(helperRef.current!.getAttribute('data-slot')).toBe('field-helper-text');
  expect(errorRef.current!.getAttribute('data-slot')).toBe('field-error-text');
});

test('dims a disabled field once, also inside a disabled Fieldset', () => {
  render(
    <>
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
    </>,
  );

  const opacity = (testId: string) => getComputedStyle(screen.getByTestId(testId)).opacity;

  expect(opacity('disabled-field')).toBe('0.5');
  expect(opacity('disabled-field-input')).toBe('1');
  expect(opacity('nested-field')).toBe('1');
});

test('keeps the RootProvider composition path Ark-shaped', async () => {
  function ProviderField() {
    const field = useField({ id: 'provider-email', invalid: true });

    return (
      <FieldRootProvider value={field}>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
      </FieldRootProvider>
    );
  }

  render(<ProviderField />);

  await expect
    .element(page.getByRole('textbox', { name: 'Email', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
  await expect
    .element(page.getByText('Enter a valid email address.', { exact: true }))
    .toBeVisible();
});

test('preserves Ark asChild composition and forwards refs for the root', async () => {
  const rootRef = createRef<HTMLDivElement>();

  render(
    <Field asChild ref={rootRef}>
      <section>
        <FieldLabel>Email</FieldLabel>
        <Input />
      </section>
    </Field>,
  );

  expect(rootRef.current).toBe(screen.getByRole('group'));
  expect(rootRef.current!.getAttribute('data-slot')).toBe('field-root');
  await expect.element(page.getByRole('textbox', { name: 'Email', exact: true })).toBeVisible();
});