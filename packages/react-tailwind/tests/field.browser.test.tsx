import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  Field,
  Fieldset,
  NativeSelect,
  Input,
  useField,
  useFieldContext,
  FieldContext,
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

test('exposes the field context through the hook and render prop', () => {
  function ContextValue() {
    const field = useFieldContext();

    return <output>{field.required ? 'required' : 'optional'}</output>;
  }

  render(
    <Field required>
      <FieldContext>
        {(field) => <output>{field.required ? 'required' : 'optional'}</output>}
      </FieldContext>
      <ContextValue />
    </Field>,
  );

  expect(screen.getAllByText('required')).toHaveLength(2);
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

test('keeps controlled field props reactive', async () => {
  const { rerender } = render(
    <Field required={false}>
      <Input aria-label="Project key" />
      <FieldRequiredIndicator />
    </Field>,
  );

  await expect
    .element(page.getByRole('textbox', { name: 'Project key', exact: true }))
    .not.toHaveAttribute('required');
  rerender(
    <Field required>
      <Input aria-label="Project key" />
      <FieldRequiredIndicator />
    </Field>,
  );

  await expect
    .element(page.getByRole('textbox', { name: 'Project key', exact: true }))
    .toHaveAttribute('required');
});

test('preserves native default values and reset behavior', async () => {
  render(
    <form aria-label="Project form">
      <Field>
        <Input aria-label="Project key" defaultValue="MAPS" name="project" />
      </Field>
      <Field>
        <NativeSelect aria-label="Priority" defaultValue="normal" name="priority">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
        </NativeSelect>
      </Field>
    </form>,
  );

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

test('applies native utilities to component-owned parts', async () => {
  const { container } = render(
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

  expect([...container.querySelector('[data-slot="field-root"]')!.classList]).toEqual(
    expect.arrayContaining(['flex', 'w-full', 'flex-col', 'items-start', 'gap-1']),
  );
  expect([...container.querySelector('[data-slot="field-item"]')!.classList]).toEqual(
    expect.arrayContaining(['grid', 'gap-1']),
  );
  expect([...container.querySelector('[data-slot="field-label"]')!.classList]).toEqual(
    expect.arrayContaining([
      'inline-flex',
      'items-center',
      'gap-2',
      'text-sm',
      'font-medium',
      'text-foreground',
    ]),
  );
  expect([...container.querySelector('[data-slot="field-helper-text"]')!.classList]).toEqual(
    expect.arrayContaining(['text-sm', 'text-muted-foreground']),
  );
  await expect.element(page.locator('[data-slot="field-error-text"]')).toHaveCount(0);
  expect([...container.querySelector('[data-slot="field-required-indicator"]')!.classList]).toEqual(
    expect.arrayContaining(['text-destructive']),
  );
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
  expect(['w-full', 'gap-1', 'text-foreground'].some((name) => root.classList.contains(name))).toBe(
    false,
  );
  expect([...label.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  expect(['gap-2', 'text-foreground'].some((name) => label.classList.contains(name))).toBe(false);
  await expect.element(page.locator('[data-slot="field-root"]')).toHaveCSS('gap', '16px');
});