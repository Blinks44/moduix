import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { Field, InputGroup } from '../src';

test('keeps the Input slot that drives grouped field state styling', () => {
  render(
    <Field disabled id="workspace" invalid readOnly>
      <Field.Label>Workspace</Field.Label>
      <InputGroup
        className="consumer-root"
        data-part="consumer-part"
        data-scope="consumer-scope"
        data-size="xs"
        data-slot="consumer-slot"
        data-testid="input-group"
        size="lg"
      >
        <InputGroup.Addon
          className="consumer-addon"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-slot="consumer-slot"
        >
          @
        </InputGroup.Addon>
        <InputGroup.Input />
        <InputGroup.Text
          className="consumer-text"
          data-part="consumer-part"
          data-scope="consumer-scope"
          data-slot="consumer-slot"
        >
          .com
        </InputGroup.Text>
        <InputGroup.Button className="consumer-button" data-slot="consumer-slot">
          Copy
        </InputGroup.Button>
      </InputGroup>
    </Field>,
  );

  const group = screen.getByTestId('input-group');
  const addon = screen.getByText('@');
  const input = screen.getByRole('textbox', { name: 'Workspace' });
  const text = screen.getByText('.com');
  const button = screen.getByRole('button', { name: 'Copy' });

  expect(group).toHaveAttribute('data-slot', 'input-group-root');
  expect(group).toHaveAttribute('data-scope', 'input-group');
  expect(group).toHaveAttribute('data-part', 'root');
  expect(group).toHaveAttribute('data-size', 'lg');
  expect(group).toHaveClass('consumer-root');
  expect(addon).toHaveAttribute('data-slot', 'input-group-addon');
  expect(addon).toHaveAttribute('data-scope', 'input-group');
  expect(addon).toHaveAttribute('data-part', 'addon');
  expect(addon).toHaveClass('consumer-addon');
  expect(input).toHaveAttribute('data-slot', 'input-root');
  expect(input).toHaveAttribute('data-size', 'lg');
  expect(input).toHaveAttribute('data-invalid');
  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('readonly');
  expect(text).toHaveAttribute('data-slot', 'input-group-text');
  expect(text).toHaveAttribute('data-scope', 'input-group');
  expect(text).toHaveAttribute('data-part', 'text');
  expect(text).toHaveClass('consumer-text');
  expect(button).toHaveAttribute('data-slot', 'input-group-button');
  expect(button).toHaveAttribute('data-size', 'lg');
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveClass('consumer-button');
  expect(button).toBeEnabled();
});