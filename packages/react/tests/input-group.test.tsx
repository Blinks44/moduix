import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Field, InputGroup } from '../src';

test('keeps the Input slot that drives grouped field state styling', () => {
  render(
    <Field disabled id="workspace" invalid readOnly>
      <Field.Label>Workspace</Field.Label>
      <InputGroup data-testid="input-group">
        <InputGroup.Addon>@</InputGroup.Addon>
        <InputGroup.Input />
        <InputGroup.Button>Copy</InputGroup.Button>
      </InputGroup>
    </Field>,
  );

  const input = screen.getByRole('textbox', { name: 'Workspace' });
  const button = screen.getByRole('button', { name: 'Copy' });

  expect(screen.getByTestId('input-group')).toHaveAttribute('data-slot', 'input-group-root');
  expect(input).toHaveAttribute('data-slot', 'input-root');
  expect(input).toHaveAttribute('data-invalid');
  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('readonly');
  expect(button).toHaveAttribute('data-slot', 'input-group-button');
  expect(button).toBeEnabled();
});