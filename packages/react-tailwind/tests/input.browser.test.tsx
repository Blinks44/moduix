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

test('applies native utilities to the input', () => {
  render(<Input aria-label="Project key" />);
  const input = screen.getByRole('textbox', { name: 'Project key' });
  expect([...input.classList]).toEqual(
    expect.arrayContaining([
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
      'file:border-primary',
      'file:bg-primary',
      'file:px-2',
      'file:py-0.5',
    ]),
  );
});

test('applies each visual size with native utilities', () => {
  render(
    <>
      <Input size="xs" aria-label="Extra-small input" />
      <Input size="sm" aria-label="Small input" />
      <Input size="md" aria-label="Medium input" />
      <Input size="lg" aria-label="Large input" />
      <Input size="xl" aria-label="Extra-large input" />
    </>,
  );

  expect(
    screen
      .getByRole('textbox', { name: 'Extra-small input' })
      ?.classList.contains('min-h-control-xs'),
  ).toBe(true);
  expect([...screen.getByRole('textbox', { name: 'Extra-small input' })!.classList]).toEqual(
    expect.arrayContaining(['px-2', 'py-0.5', 'text-xs', 'leading-4']),
  );
  expect([...screen.getByRole('textbox', { name: 'Small input' })!.classList]).toEqual(
    expect.arrayContaining(['min-h-control-sm', 'px-2', 'py-1', 'text-sm', 'leading-5']),
  );
  expect(
    screen.getByRole('textbox', { name: 'Medium input' })?.classList.contains('min-h-control-md'),
  ).toBe(true);
  expect([...screen.getByRole('textbox', { name: 'Large input' })!.classList]).toEqual(
    expect.arrayContaining(['min-h-control-lg', 'px-4', 'py-1', 'text-lg', 'leading-7']),
  );
  expect(
    screen
      .getByRole('textbox', { name: 'Extra-large input' })
      ?.classList.contains('min-h-control-xl'),
  ).toBe(true);
  expect([...screen.getByRole('textbox', { name: 'Extra-large input' })!.classList]).toEqual(
    expect.arrayContaining(['px-4', 'py-2', 'text-lg', 'leading-7']),
  );
});

test('lets consumer utilities replace component defaults', () => {
  render(
    <Input
      size="lg"
      htmlSize={8}
      aria-label="Project key"
      className="min-h-20 w-80 max-w-sm rounded-lg bg-muted px-0 py-0 leading-5"
    />,
  );

  const input = screen.getByRole('textbox', { name: 'Project key' });
  expect([...input.classList]).toEqual(
    expect.arrayContaining([
      'w-80',
      'max-w-sm',
      'min-h-20',
      'rounded-lg',
      'bg-muted',
      'px-0',
      'py-0',
      'leading-5',
    ]),
  );
  for (const utility of [
    'w-full',
    'w-auto',
    'max-w-none',
    'min-h-control-lg',
    'rounded-md',
    'bg-background',
    'px-4',
    'py-1',
    'leading-7',
  ]) {
    expect(input.classList.contains(utility)).toBe(false);
  }
  expect(getComputedStyle(input)).toMatchObject({
    minHeight: '80px',
    width: '320px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    lineHeight: '20px',
  });
});