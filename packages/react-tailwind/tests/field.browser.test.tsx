import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  Field,
  Input,
  useField,
  useFieldContext,
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
} from '../src';

test('keeps FieldInput native size distinct from Input visual size', async () => {
  render(
    <>
      <FieldInput aria-label="Field input" size={8} disabled aria-invalid="true" />
      <Input aria-label="Input" size="md" htmlSize={8} disabled aria-invalid="true" />
    </>,
  );

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

test('wires labels, descriptions, errors, and field state to a native control', async () => {
  render(
    <Field disabled id="email" invalid readOnly required>
      <FieldLabel>Email</FieldLabel>
      <FieldInput />
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
      <FieldInput aria-label="Email" />
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>,
  );

  await expect
    .element(page.getByText('Enter a valid email address.', { exact: true }))
    .toHaveCount(0);

  rerender(
    <Field invalid>
      <FieldInput aria-label="Email" />
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
        <FieldInput />
      </FieldItem>
    </Field>,
  );

  const input = screen.getByRole('textbox', { name: 'Email' });

  expect(itemRef.current!.getAttribute('data-slot')).toBe('field-item');
  await expect.element(page.getByText('Email', { exact: true })).toHaveAttribute('for', input.id);
});

test('forwards refs and styling hooks for the Ark native parts', () => {
  const rootRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();
  const textareaRef = createRef<HTMLTextAreaElement>();
  const selectRef = createRef<HTMLSelectElement>();

  render(
    <>
      <Field ref={rootRef}>
        <FieldLabel>Name</FieldLabel>
        <FieldInput ref={inputRef} />
      </Field>
      <Field>
        <FieldLabel>Summary</FieldLabel>
        <FieldTextarea ref={textareaRef} />
      </Field>
      <Field>
        <FieldLabel>Priority</FieldLabel>
        <FieldSelect ref={selectRef}>
          <option>Normal</option>
        </FieldSelect>
      </Field>
    </>,
  );

  expect(rootRef.current!.getAttribute('data-slot')).toBe('field-root');
  expect(inputRef.current!.getAttribute('data-slot')).toBe('field-input');
  expect(textareaRef.current!.getAttribute('data-slot')).toBe('field-textarea');
  expect(selectRef.current!.getAttribute('data-slot')).toBe('field-select');
});

test('keeps the RootProvider composition path Ark-shaped', async () => {
  function ProviderField() {
    const field = useField({ id: 'provider-email', invalid: true });

    return (
      <FieldRootProvider value={field}>
        <FieldLabel>Email</FieldLabel>
        <FieldInput />
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
        <FieldInput />
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
      <FieldInput aria-label="Project key" />
      <FieldRequiredIndicator />
    </Field>,
  );

  await expect
    .element(page.getByRole('textbox', { name: 'Project key', exact: true }))
    .not.toHaveAttribute('required');
  rerender(
    <Field required>
      <FieldInput aria-label="Project key" />
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
        <FieldInput aria-label="Project key" defaultValue="MAPS" name="project" />
      </Field>
      <Field>
        <FieldSelect aria-label="Priority" defaultValue="normal" name="priority">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
        </FieldSelect>
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
        <FieldInput />
        <FieldTextarea />
        <FieldSelect>
          <option>Normal</option>
        </FieldSelect>
        <FieldHelperText>Use your work email.</FieldHelperText>
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
      </FieldItem>
    </Field>,
  );

  expect([...container.querySelector('[data-slot="field-root"]')!.classList]).toEqual(
    expect.arrayContaining(['flex', 'w-full', 'max-w-none', 'flex-col', 'items-start', 'gap-1']),
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
  expect([...container.querySelector('[data-slot="field-input"]')!.classList]).toEqual(
    expect.arrayContaining([
      'w-full',
      'min-h-control-md',
      'rounded-md',
      'border-border',
      'bg-background',
      'px-3',
      'py-1',
      'text-md',
    ]),
  );
  expect([...container.querySelector('[data-slot="field-textarea"]')!.classList]).toEqual(
    expect.arrayContaining(['min-h-20', 'resize-y']),
  );
  expect([...container.querySelector('[data-slot="field-select"]')!.classList]).toEqual(
    expect.arrayContaining([
      'w-full',
      'min-h-control-md',
      'rounded-md',
      'border-border',
      'bg-background',
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
      <FieldInput className="w-80 rounded-lg bg-muted px-0 text-primary" />
    </Field>,
  );

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
  expect(['gap-2', 'text-foreground'].some((name) => label.classList.contains(name))).toBe(false);
  expect([...input.classList]).toEqual(
    expect.arrayContaining(['w-80', 'rounded-lg', 'bg-muted', 'px-0', 'text-primary']),
  );
  expect(
    ['w-full', 'rounded-md', 'bg-background', 'px-3'].some((name) =>
      input.classList.contains(name),
    ),
  ).toBe(false);
  await expect.element(page.locator('[data-slot="field-root"]')).toHaveCSS('gap', '16px');
  await expect.element(page.locator('[data-slot="field-input"]')).toHaveCSS('width', '320px');
  await expect.element(page.locator('[data-slot="field-input"]')).toHaveCSS('padding-left', '0px');
  await expect
    .element(page.locator('[data-slot="field-input"]'))
    .toHaveCSS('border-radius', '10px');
});