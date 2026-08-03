import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Field, Input } from '../src';

test('preserves native field state and component-owned styling hooks', () => {
  render(
    <Field disabled id="email" invalid readOnly required>
      <Field.Label>Email</Field.Label>
      <Input
        data-part="consumer-part"
        data-scope="consumer-scope"
        data-size="xs"
        data-slot="consumer-slot"
        htmlSize={8}
      />
    </Field>,
  );

  const input = screen.getByRole('textbox', { name: 'Email' });

  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAttribute('readonly');
  expect(input).toBeRequired();
  expect(input).toHaveAttribute('data-part', 'input');
  expect(input).toHaveAttribute('data-scope', 'field');
  expect(input).toHaveAttribute('data-size', 'md');
  expect(input).toHaveAttribute('data-slot', 'input-root');
  expect(input).toHaveAttribute('data-html-size');
  expect(input).toHaveAttribute('size', '8');
});

test('forwards the input ref and preserves asChild composition', () => {
  const inputRef = createRef<HTMLInputElement>();

  render(
    <Field>
      <Field.Label>Repository</Field.Label>
      <Input asChild ref={inputRef}>
        <input name="repository" />
      </Input>
    </Field>,
  );

  const input = screen.getByRole('textbox', { name: 'Repository' });

  expect(inputRef.current).toBe(input);
  expect(input).toHaveAttribute('data-slot', 'input-root');
});