import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Field, Input, FieldLabel } from '../src';

test('preserves native field state and component-owned styling hooks', () => {
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
      <FieldLabel>Repository</FieldLabel>
      <Input asChild ref={inputRef}>
        <input name="repository" />
      </Input>
    </Field>,
  );

  const input = screen.getByRole('textbox', { name: 'Repository' });

  expect(inputRef.current).toBe(input);
  expect(input).toHaveAttribute('data-slot', 'input-root');
});

test('applies native utilities to the input', () => {
  const { container } = render(<Input aria-label="Project key" />);
  const input = container.querySelector('[data-slot="input-root"]');

  expect(input).toHaveClass(
    'w-full',
    'max-w-none',
    'min-h-control-md',
    'rounded-md',
    'border',
    'border-border',
    'bg-background',
    'px-3',
    'py-1',
    'text-md',
    'leading-6',
  );
  expect(input).toHaveClass('file:border-primary', 'file:bg-primary', 'file:px-2', 'file:py-0.5');
});

test('applies each visual size with native utilities', () => {
  const { container } = render(
    <>
      <Input size="xs" aria-label="Extra-small input" />
      <Input size="sm" aria-label="Small input" />
      <Input size="md" aria-label="Medium input" />
      <Input size="lg" aria-label="Large input" />
      <Input size="xl" aria-label="Extra-large input" />
    </>,
  );

  expect(container.querySelector('[aria-label="Extra-small input"]')).toHaveClass(
    'min-h-control-xs',
    'px-2',
    'py-0.5',
    'text-xs',
    'leading-4',
  );
  expect(container.querySelector('[aria-label="Small input"]')).toHaveClass(
    'min-h-control-sm',
    'px-2',
    'py-1',
    'text-sm',
    'leading-5',
  );
  expect(container.querySelector('[aria-label="Medium input"]')).toHaveClass('min-h-control-md');
  expect(container.querySelector('[aria-label="Large input"]')).toHaveClass(
    'min-h-control-lg',
    'px-4',
    'py-1',
    'text-lg',
    'leading-7',
  );
  expect(container.querySelector('[aria-label="Extra-large input"]')).toHaveClass(
    'min-h-control-xl',
    'px-4',
    'py-2',
    'text-lg',
    'leading-7',
  );
});

test('lets consumer utilities replace component defaults', () => {
  const { container } = render(
    <Input
      size="lg"
      htmlSize={8}
      aria-label="Project key"
      className="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 py-0 leading-5"
    />,
  );

  const input = container.querySelector('[data-slot="input-root"]');

  expect(input).toHaveClass(
    'w-80',
    'max-w-sm',
    'min-h-20',
    'rounded-lg',
    'bg-muted',
    'px-0',
    'py-0',
    'leading-5',
  );
  expect(input).not.toHaveClass(
    'w-full',
    'w-auto',
    'max-w-none',
    'min-h-control-lg',
    'rounded-md',
    'bg-background',
    'px-4',
    'py-1',
    'leading-7',
  );
});