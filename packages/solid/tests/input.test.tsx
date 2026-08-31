import { Field } from '@ark-ui/solid/field';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Input } from '../src';

test('preserves native field state and component-owned styling hooks', () => {
  render(() => (
    <Field.Root disabled id="email" invalid readOnly required>
      <Field.Label>Email</Field.Label>
      <Input
        data-part="consumer-part"
        data-scope="consumer-scope"
        data-size="xs"
        data-slot="consumer-slot"
        htmlSize={8}
      />
    </Field.Root>
  ));

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

test('forwards the input ref on the ordinary path', () => {
  let inputRef!: HTMLInputElement;

  render(() => <Input ref={(element) => (inputRef = element)} aria-label="Repository" />);

  const input = screen.getByRole('textbox', { name: 'Repository' });

  expect(inputRef).toBe(input);
  expect(input).toHaveAttribute('data-slot', 'input-root');
});

test('preserves asChild composition without forwarding the ref through Ark Solid', () => {
  let inputRef: HTMLInputElement | undefined;

  render(() => (
    <Input
      ref={(element) => (inputRef = element)}
      asChild={(props) => <input {...props()} name="repository" aria-label="Repository" />}
    />
  ));

  const input = screen.getByRole('textbox', { name: 'Repository' });

  expect(input).toHaveAttribute('name', 'repository');
  expect(input).toHaveAttribute('data-slot', 'input-root');
  expect(inputRef).toBeUndefined();
});