import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import {
  Field,
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

test('wires labels, descriptions, errors, and field state to a native control', () => {
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
      <FieldInput aria-label="Email" />
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>
  ));

  expect(screen.queryByText('Enter a valid email address.')).not.toBeInTheDocument();

  setInvalid(true);

  await waitFor(() =>
    expect(screen.getByText('Enter a valid email address.')).toHaveAttribute('aria-live', 'polite'),
  );
});

test('forwards FieldItem refs and uses target for its label wiring', () => {
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

  expect(rootRef).toHaveAttribute('data-slot', 'field-root');
  expect(inputRef).toHaveAttribute('data-slot', 'field-input');
  expect(textareaRef).toHaveAttribute('data-slot', 'field-textarea');
  expect(selectRef).toHaveAttribute('data-slot', 'field-select');
});

test('keeps the RootProvider composition path Ark-shaped', () => {
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
      <FieldContext>
        {(field) => <output>{field().required ? 'required' : 'optional'}</output>}
      </FieldContext>
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
      <FieldLabel>Email</FieldLabel>
      <FieldInput />
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
      <FieldInput aria-label="Project key" />
      <FieldRequiredIndicator />
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
  const input = screen.getByRole('textbox', { name: 'Project key' });
  const select = screen.getByRole('combobox', { name: 'Priority' });

  expect(input).toHaveValue('MAPS');
  expect(select).toHaveValue('normal');

  fireEvent.input(input, { target: { value: 'MODUIX' } });
  form.reset();

  expect(input).toHaveValue('MAPS');
});

test('applies native utilities to component-owned parts', () => {
  const { container } = render(() => (
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
    </Field>
  ));

  expect(container.querySelector('[data-slot="field-root"]')).toHaveClass(
    'flex',
    'w-full',
    'max-w-none',
    'flex-col',
    'items-start',
    'gap-1',
  );
  expect(container.querySelector('[data-slot="field-item"]')).toHaveClass('grid', 'gap-1');
  expect(container.querySelector('[data-slot="field-label"]')).toHaveClass(
    'inline-flex',
    'items-center',
    'gap-2',
    'text-sm',
    'font-medium',
    'text-foreground',
  );
  expect(container.querySelector('[data-slot="field-input"]')).toHaveClass(
    'w-full',
    'min-h-control-md',
    'rounded-md',
    'border-border',
    'bg-background',
    'px-3.5',
    'py-1',
    'text-md',
  );
  expect(container.querySelector('[data-slot="field-textarea"]')).toHaveClass(
    'min-h-20',
    'resize-y',
  );
  expect(container.querySelector('[data-slot="field-select"]')).toHaveClass(
    'w-full',
    'min-h-control-md',
    'rounded-md',
    'border-border',
    'bg-background',
  );
  expect(container.querySelector('[data-slot="field-helper-text"]')).toHaveClass(
    'text-sm',
    'text-muted-foreground',
  );
  expect(container.querySelector('[data-slot="field-error-text"]')).not.toBeInTheDocument();
  expect(container.querySelector('[data-slot="field-required-indicator"]')).toHaveClass(
    'text-destructive',
  );
});

test('lets consumer utilities replace component defaults', () => {
  const { container } = render(() => (
    <Field class="w-80 max-w-sm gap-4 text-primary">
      <FieldLabel class="gap-4 text-primary">Name</FieldLabel>
      <FieldInput class="w-80 rounded-lg bg-muted px-0 text-primary" />
    </Field>
  ));

  const root = container.querySelector('[data-slot="field-root"]');
  const label = container.querySelector('[data-slot="field-label"]');
  const input = container.querySelector('[data-slot="field-input"]');

  expect(root).toHaveClass('w-80', 'max-w-sm', 'gap-4', 'text-primary');
  expect(root).not.toHaveClass('w-full', 'max-w-none', 'gap-1', 'text-foreground');
  expect(label).toHaveClass('gap-4', 'text-primary');
  expect(label).not.toHaveClass('gap-2', 'text-foreground');
  expect(input).toHaveClass('w-80', 'rounded-lg', 'bg-muted', 'px-0', 'text-primary');
  expect(input).not.toHaveClass('w-full', 'rounded-md', 'bg-background', 'px-3.5', 'text-md');
});
