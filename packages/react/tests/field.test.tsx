import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Field, useField } from '../src';

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