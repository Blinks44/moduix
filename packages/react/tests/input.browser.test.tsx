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

test('uses the native character width with htmlSize', () => {
  render(
    <div style={{ width: '600px' }}>
      <Input aria-label="Full width" />
      <Input aria-label="Four characters" htmlSize={4} />
    </div>,
  );

  expect(screen.getByRole('textbox', { name: 'Full width' }).offsetWidth).toBe(600);
  expect(screen.getByRole('textbox', { name: 'Four characters' }).offsetWidth).toBeLessThan(200);
});

test('shrinks below its htmlSize width in a narrow flex row', () => {
  render(
    <div style={{ display: 'flex', width: '80px' }}>
      <Input aria-label="Narrow" htmlSize={20} />
    </div>,
  );

  expect(screen.getByRole('textbox', { name: 'Narrow' }).offsetWidth).toBe(80);
});