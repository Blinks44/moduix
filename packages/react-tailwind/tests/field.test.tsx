import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Field, useField, useFieldContext } from '../src';

test('wires labels, descriptions, errors, and field state to a native control', () => {
  render(
    <Field disabled id="email" invalid readOnly required>
      <Field.Label>Email</Field.Label>
      <Field.Input />
      <Field.HelperText>Use your work email.</Field.HelperText>
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>,
  );

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

test('renders error text only while invalid', () => {
  const { rerender } = render(
    <Field>
      <Field.Input aria-label="Email" />
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>,
  );

  expect(screen.queryByText('Enter a valid email address.')).not.toBeInTheDocument();

  rerender(
    <Field invalid>
      <Field.Input aria-label="Email" />
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>,
  );

  expect(screen.getByText('Enter a valid email address.')).toHaveAttribute('aria-live', 'polite');
});

test('forwards Field.Item refs and uses target for its label wiring', () => {
  const itemRef = createRef<HTMLDivElement>();

  render(
    <Field id="contact" target="email">
      <Field.Item ref={itemRef} value="email">
        <Field.Label>Email</Field.Label>
        <Field.Input />
      </Field.Item>
    </Field>,
  );

  const input = screen.getByRole('textbox', { name: 'Email' });

  expect(itemRef.current).toHaveAttribute('data-slot', 'field-item');
  expect(screen.getByText('Email')).toHaveAttribute('for', input.id);
});

test('forwards refs and styling hooks for the Ark native parts', () => {
  const rootRef = createRef<HTMLDivElement>();
  const inputRef = createRef<HTMLInputElement>();
  const textareaRef = createRef<HTMLTextAreaElement>();
  const selectRef = createRef<HTMLSelectElement>();

  render(
    <>
      <Field ref={rootRef}>
        <Field.Label>Name</Field.Label>
        <Field.Input ref={inputRef} />
      </Field>
      <Field>
        <Field.Label>Summary</Field.Label>
        <Field.Textarea ref={textareaRef} />
      </Field>
      <Field>
        <Field.Label>Priority</Field.Label>
        <Field.Select ref={selectRef}>
          <option>Normal</option>
        </Field.Select>
      </Field>
    </>,
  );

  expect(rootRef.current).toHaveAttribute('data-slot', 'field-root');
  expect(inputRef.current).toHaveAttribute('data-slot', 'field-input');
  expect(textareaRef.current).toHaveAttribute('data-slot', 'field-textarea');
  expect(selectRef.current).toHaveAttribute('data-slot', 'field-select');
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

  render(<ProviderField />);

  expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByText('Enter a valid email address.')).toBeVisible();
});

test('exposes the field context through the hook and render prop', () => {
  function ContextValue() {
    const field = useFieldContext();

    return <output>{field.required ? 'required' : 'optional'}</output>;
  }

  render(
    <Field required>
      <Field.Context>
        {(field) => <output>{field.required ? 'required' : 'optional'}</output>}
      </Field.Context>
      <ContextValue />
    </Field>,
  );

  expect(screen.getAllByText('required')).toHaveLength(2);
});

test('preserves Ark asChild composition and forwards refs for the root', () => {
  const rootRef = createRef<HTMLDivElement>();

  render(
    <Field asChild ref={rootRef}>
      <section>
        <Field.Label>Email</Field.Label>
        <Field.Input />
      </section>
    </Field>,
  );

  expect(rootRef.current).toBe(screen.getByRole('group'));
  expect(rootRef.current).toHaveAttribute('data-slot', 'field-root');
  expect(screen.getByRole('textbox', { name: 'Email' })).toBeVisible();
});

test('keeps controlled field props reactive', () => {
  const { rerender } = render(
    <Field required={false}>
      <Field.Input aria-label="Project key" />
      <Field.RequiredIndicator />
    </Field>,
  );

  const input = screen.getByRole('textbox', { name: 'Project key' });

  expect(input).not.toBeRequired();
  rerender(
    <Field required>
      <Field.Input aria-label="Project key" />
      <Field.RequiredIndicator />
    </Field>,
  );

  expect(input).toBeRequired();
});

test('preserves native default values and reset behavior', () => {
  render(
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
    </form>,
  );

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
  const { container } = render(
    <Field required>
      <Field.Item value="name">
        <Field.Label>
          Name
          <Field.RequiredIndicator>*</Field.RequiredIndicator>
        </Field.Label>
        <Field.Input />
        <Field.Textarea />
        <Field.Select>
          <option>Normal</option>
        </Field.Select>
        <Field.HelperText>Use your work email.</Field.HelperText>
        <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
      </Field.Item>
    </Field>,
  );

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
  const { container } = render(
    <Field className="w-80 max-w-sm gap-4 text-primary">
      <Field.Label className="gap-4 text-primary">Name</Field.Label>
      <Field.Input className="w-80 rounded-lg bg-muted px-0 text-primary" />
    </Field>,
  );

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