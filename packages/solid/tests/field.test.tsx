import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { Field, useField, useFieldContext } from '../src';

test('wires labels, descriptions, errors, and field state to a native control', () => {
  render(() => (
    <Field disabled id="email" invalid readOnly required>
      <Field.Label>Email</Field.Label>
      <Field.Input />
      <Field.HelperText>Use your work email.</Field.HelperText>
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>
  ));

  const input = screen.getByRole('textbox', { name: 'Email' });
  const helperText = screen.getByText('Use your work email.');
  const errorText = screen.getByText('Enter a valid email address.');

  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input.getAttribute('aria-describedby')).toContain(helperText.id);
  expect(input).toHaveAttribute('aria-errormessage', errorText.id);
  expect(input).toBeRequired();
  expect(input).toHaveAttribute('readonly');
  expect(screen.getByText('Email')).toHaveAttribute('for', input.id);
});

test('renders error text only while invalid', async () => {
  const [invalid, setInvalid] = createSignal(false);

  render(() => (
    <Field invalid={invalid()}>
      <Field.Input aria-label="Email" />
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>
  ));

  expect(screen.queryByText('Enter a valid email address.')).not.toBeInTheDocument();

  setInvalid(true);

  await waitFor(() =>
    expect(screen.getByText('Enter a valid email address.')).toHaveAttribute('aria-live', 'polite'),
  );
});

test('forwards Field.Item refs and uses target for its label wiring', () => {
  let itemRef!: HTMLDivElement;

  render(() => (
    <Field id="contact" target="email">
      <Field.Item ref={(element) => (itemRef = element)} value="email">
        <Field.Label>Email</Field.Label>
        <Field.Input />
      </Field.Item>
    </Field>
  ));

  const input = screen.getByRole('textbox', { name: 'Email' });

  expect(itemRef).toHaveAttribute('data-slot', 'field-item');
  expect(screen.getByText('Email')).toHaveAttribute('for', input.id);
});

test('forwards refs and styling hooks for the Ark native parts', () => {
  let rootRef!: HTMLDivElement;
  let inputRef!: HTMLInputElement;
  let textareaRef!: HTMLTextAreaElement;
  let selectRef!: HTMLSelectElement;

  render(() => (
    <>
      <Field ref={(element) => (rootRef = element)}>
        <Field.Label>Name</Field.Label>
        <Field.Input ref={(element) => (inputRef = element)} />
      </Field>
      <Field>
        <Field.Label>Summary</Field.Label>
        <Field.Textarea ref={(element) => (textareaRef = element)} />
      </Field>
      <Field>
        <Field.Label>Priority</Field.Label>
        <Field.Select ref={(element) => (selectRef = element)}>
          <option>Normal</option>
        </Field.Select>
      </Field>
    </>
  ));

  expect(rootRef).toHaveAttribute('data-slot', 'field-root');
  expect(inputRef).toHaveAttribute('data-slot', 'field-input');
  expect(textareaRef).toHaveAttribute('data-slot', 'field-textarea');
  expect(selectRef).toHaveAttribute('data-slot', 'field-select');
});

test('keeps the RootProvider composition path Ark-shaped', () => {
  function ProviderField() {
    const field = useField({ id: 'provider-email', invalid: true });

    return (
      <Field.RootProvider value={field}>
        <Field.Label>Email</Field.Label>
        <Field.Input />
        <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
      </Field.RootProvider>
    );
  }

  render(() => <ProviderField />);

  expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByText('Enter a valid email address.')).toBeVisible();
});

test('exposes the field context through the hook and render prop', () => {
  function ContextValue() {
    const field = useFieldContext();

    return <output>{field().required ? 'required' : 'optional'}</output>;
  }

  render(() => (
    <Field required>
      <Field.Context>
        {(field) => <output>{field().required ? 'required' : 'optional'}</output>}
      </Field.Context>
      <ContextValue />
    </Field>
  ));

  expect(screen.getAllByText('required')).toHaveLength(2);
});

test('preserves asChild composition without forwarding the ref through Ark Solid', () => {
  let rootRef: HTMLElement | undefined;

  render(() => (
    <Field
      ref={(element) => (rootRef = element)}
      asChild={(props) => <section {...props()} aria-label="Email field" />}
    >
      <Field.Label>Email</Field.Label>
      <Field.Input />
    </Field>
  ));

  const root = screen.getByRole('group', { name: 'Email field' });

  expect(root.tagName).toBe('SECTION');
  expect(root).toHaveAttribute('data-slot', 'field-root');
  expect(screen.getByRole('textbox', { name: 'Email' })).toBeVisible();
  expect(rootRef).toBeUndefined();
});

test('keeps controlled field props reactive', () => {
  const [required, setRequired] = createSignal(false);

  render(() => (
    <Field required={required()}>
      <Field.Input aria-label="Project key" />
      <Field.RequiredIndicator />
    </Field>
  ));

  const input = screen.getByRole('textbox', { name: 'Project key' });

  expect(input).not.toBeRequired();
  fireEvent.input(input, { target: { value: 'MAPS' } });
  setRequired(true);

  expect(input).toBeRequired();
});

test('preserves native default values and reset behavior', () => {
  render(() => (
    <form aria-label="Project form">
      <Field>
        <Field.Input aria-label="Project key" defaultValue="MAPS" name="project" />
      </Field>
      <Field>
        <Field.Select aria-label="Priority" defaultValue="normal" name="priority">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
        </Field.Select>
      </Field>
    </form>
  ));

  const form = screen.getByRole('form', { name: 'Project form' }) as HTMLFormElement;
  const input = screen.getByRole('textbox', { name: 'Project key' });
  const select = screen.getByRole('combobox', { name: 'Priority' });

  expect(input).toHaveValue('MAPS');
  expect(select).toHaveValue('normal');

  fireEvent.input(input, { target: { value: 'MODUIX' } });
  form.reset();

  expect(input).toHaveValue('MAPS');
});