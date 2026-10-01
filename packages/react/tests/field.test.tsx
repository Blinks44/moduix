import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import {
  Field,
  Input,
  useField,
  FieldErrorText,
  FieldHelperText,
  FieldInput,
  FieldItem,
  FieldLabel,
  FieldRootProvider,
  FieldSelect,
  FieldTextarea,
} from '../src';
import fieldStyles from '../src/components/field/Field.module.css';

test('keeps FieldInput native size distinct from Input visual size', () => {
  render(
    <>
      <FieldInput aria-label="Field input" size={8} disabled aria-invalid="true" />
      <Input aria-label="Input" size="md" htmlSize={8} disabled aria-invalid="true" />
    </>,
  );

  const fieldInput = screen.getByRole('textbox', { name: 'Field input' });
  const input = screen.getByRole('textbox', { name: 'Input' });

  expect(fieldInput).toHaveAttribute('size', '8');
  expect(input).toHaveAttribute('size', '8');
  expect(fieldInput).toHaveAttribute('data-slot', 'field-input');
  expect(fieldInput).toHaveClass(fieldStyles.control, fieldStyles.input);
  expect(fieldInput).not.toHaveAttribute('data-size');
  expect(input).toHaveAttribute('data-size', 'md');
  expect(fieldInput).toBeDisabled();
  expect(input).toBeDisabled();
  expect(fieldInput).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAttribute('aria-invalid', 'true');
});

test('wires labels, descriptions, errors, and field state to a native control', () => {
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
      <FieldInput aria-label="Email" />
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>,
  );

  expect(screen.queryByText('Enter a valid email address.')).not.toBeInTheDocument();

  rerender(
    <Field invalid>
      <FieldInput aria-label="Email" />
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>,
  );

  expect(screen.getByText('Enter a valid email address.')).toHaveAttribute('aria-live', 'polite');
});

test('forwards FieldItem refs and uses target for its label wiring', () => {
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

  expect(rootRef.current).toHaveAttribute('data-slot', 'field-root');
  expect(inputRef.current).toHaveAttribute('data-slot', 'field-input');
  expect(textareaRef.current).toHaveAttribute('data-slot', 'field-textarea');
  expect(selectRef.current).toHaveAttribute('data-slot', 'field-select');
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

  render(<ProviderField />);

  expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByText('Enter a valid email address.')).toBeVisible();
});

test('preserves Ark asChild composition and forwards refs for the root', () => {
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
  expect(rootRef.current).toHaveAttribute('data-slot', 'field-root');
  expect(screen.getByRole('textbox', { name: 'Email' })).toBeVisible();
});