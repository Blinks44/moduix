import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Field, Input, FieldLabel } from '../src';

test('preserves native field state and component-owned styling hooks', async () => {
  render(
    <Field disabled id="email" invalid readOnly required>
      <FieldLabel>Email</FieldLabel>
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

  const textbox = page.getByRole('textbox', { name: 'Email' });
  await expect.element(textbox).toBeDisabled();
  await expect.element(textbox).toHaveAttribute('aria-invalid', 'true');
  await expect.element(textbox).toHaveAttribute('readonly');
  expect(input?.hasAttribute('required')).toBe(true);
  expect(input.dataset).toMatchObject({
    part: 'input',
    scope: 'field',
    size: 'md',
    slot: 'input-root',
  });
  expect(input.hasAttribute('data-html-size')).toBe(true);
  await expect.element(textbox).toHaveAttribute('size', '8');
});

test('forwards the input ref and preserves asChild composition', () => {
  const inputRef = createRef<HTMLInputElement>();

  render(
    <Field>
      <FieldLabel>Repository</FieldLabel>
      <Input asChild ref={inputRef}>
        <input name="repository" />
      </Input>
    </Field>,
  );

  const input = screen.getByRole('textbox', { name: 'Repository' });

  expect(inputRef.current).toBe(input);
  expect(input.getAttribute('data-slot')).toBe('input-root');
});