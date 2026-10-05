import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
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
import fieldStyles from '../src/components/field/Field.module.css';

test('keeps FieldInput native size distinct from Input visual size', async () => {
  render(() => (
    <>
      <FieldInput aria-label="Field input" size={8} disabled aria-invalid="true" />
      <Input aria-label="Input" size="md" htmlSize={8} disabled aria-invalid="true" />
    </>
  ));

  const fieldInput = screen.getByRole('textbox', { name: 'Field input' });

  const fieldInputLocator = page.getByRole('textbox', { name: 'Field input', exact: true });
  await expect.element(fieldInputLocator).toHaveAttribute('size', '8');
  const textbox = page.getByRole('textbox', { name: 'Input', exact: true });
  await expect.element(textbox).toHaveAttribute('size', '8');
  await expect.element(fieldInputLocator).toHaveAttribute('data-slot', 'field-input');
  expect([...fieldInput.classList]).toEqual(
    expect.arrayContaining([fieldStyles.control, fieldStyles.input]),
  );
  await expect.element(fieldInputLocator).not.toHaveAttribute('data-size');
  await expect.element(textbox).toHaveAttribute('data-size', 'md');
  await expect.element(fieldInputLocator).toBeDisabled();
  await expect.element(textbox).toBeDisabled();
  await expect.element(fieldInputLocator).toHaveAttribute('aria-invalid', 'true');
  await expect.element(textbox).toHaveAttribute('aria-invalid', 'true');
});

test('wires labels, descriptions, errors, and field state to a native control', async () => {
  render(() => (
    <Field disabled id="email" invalid readOnly required>
      <FieldLabel>Email</FieldLabel>
      <FieldInput />
      <FieldHelperText>Use your work email.</FieldHelperText>
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>
  ));

  const input = screen.getByRole('textbox', { name: 'Email' });
  const helperText = screen.getByText('Use your work email.');
  const errorText = screen.getByText('Enter a valid email address.');

  const inputLocator = page.getByRole('textbox', { name: 'Email', exact: true });
  await expect.element(inputLocator).toBeDisabled();
  await expect.element(inputLocator).toHaveAttribute('aria-invalid', 'true');
  expect(input.getAttribute('aria-describedby')).toContain(helperText.id);
  await expect.element(inputLocator).toHaveAttribute('aria-errormessage', errorText.id);
  await expect.element(inputLocator).toHaveAttribute('required');
  await expect.element(inputLocator).toHaveAttribute('readonly');
  await expect.element(page.getByText('Email', { exact: true })).toHaveAttribute('for', input.id);
});

test('renders error text only while invalid', async () => {
  const [invalid, setInvalid] = createSignal(false);

  render(() => (
    <Field invalid={invalid()}>
      <FieldInput aria-label="Email" />
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>
  ));

  await expect
    .element(page.getByText('Enter a valid email address.', { exact: true }))
    .toHaveCount(0);

  setInvalid(true);

  await expect
    .element(page.getByText('Enter a valid email address.', { exact: true }))
    .toHaveAttribute('aria-live', 'polite');
});

test('forwards FieldItem refs and uses target for its label wiring', async () => {
  let itemRef!: HTMLDivElement;

  render(() => (
    <Field id="contact" target="email">
      <FieldItem ref={(element) => (itemRef = element)} value="email">
        <FieldLabel>Email</FieldLabel>
        <FieldInput />
      </FieldItem>
    </Field>
  ));

  const input = screen.getByRole('textbox', { name: 'Email' });

  expect(itemRef.getAttribute('data-slot')).toBe('field-item');
  await expect.element(page.getByText('Email', { exact: true })).toHaveAttribute('for', input.id);
});

test('forwards refs and styling hooks for the Ark native parts', () => {
  let rootRef!: HTMLDivElement;
  let inputRef!: HTMLInputElement;
  let textareaRef!: HTMLTextAreaElement;
  let selectRef!: HTMLSelectElement;

  render(() => (
    <>
      <Field ref={(element) => (rootRef = element)}>
        <FieldLabel>Name</FieldLabel>
        <FieldInput ref={(element) => (inputRef = element)} />
      </Field>
      <Field>
        <FieldLabel>Summary</FieldLabel>
        <FieldTextarea ref={(element) => (textareaRef = element)} />
      </Field>
      <Field>
        <FieldLabel>Priority</FieldLabel>
        <FieldSelect ref={(element) => (selectRef = element)}>
          <option>Normal</option>
        </FieldSelect>
      </Field>
    </>
  ));

  expect(rootRef.getAttribute('data-slot')).toBe('field-root');
  expect(inputRef.getAttribute('data-slot')).toBe('field-input');
  expect(textareaRef.getAttribute('data-slot')).toBe('field-textarea');
  expect(selectRef.getAttribute('data-slot')).toBe('field-select');
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

  render(() => <ProviderField />);

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

    return <output>{field().required ? 'required' : 'optional'}</output>;
  }

  render(() => (
    <Field required>
      <FieldContext>
        {(field) => <output>{field().required ? 'required' : 'optional'}</output>}
      </FieldContext>
      <ContextValue />
    </Field>
  ));

  expect(screen.getAllByText('required')).toHaveLength(2);
});

test('preserves asChild composition without forwarding the ref through Ark Solid', async () => {
  let rootRef: HTMLElement | undefined;

  render(() => (
    <Field
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} aria-label="Email field" />}
    >
      <FieldLabel>Email</FieldLabel>
      <FieldInput />
    </Field>
  ));

  const root = screen.getByRole('group', { name: 'Email field' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('group', { name: 'Email field', exact: true }))
    .toHaveAttribute('data-slot', 'field-root');
  await expect.element(page.getByRole('textbox', { name: 'Email', exact: true })).toBeVisible();
  expect(rootRef).toBeUndefined();
});

test('keeps controlled field props reactive', async () => {
  const [required, setRequired] = createSignal(false);

  render(() => (
    <Field required={required()}>
      <FieldInput aria-label="Project key" />
      <FieldRequiredIndicator />
    </Field>
  ));

  await expect
    .element(page.getByRole('textbox', { name: 'Project key', exact: true }))
    .not.toHaveAttribute('required');
  setRequired(true);

  await expect
    .element(page.getByRole('textbox', { name: 'Project key', exact: true }))
    .toHaveAttribute('required');
});

test('preserves native default values and reset behavior', async () => {
  render(() => (
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
    </form>
  ));

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