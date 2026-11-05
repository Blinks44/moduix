import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import FieldItemRefs from './FieldItemRefs.svelte';
import FieldOverride from './FieldOverride.svelte';
import FieldState from './FieldState.svelte';

test('wires labels, descriptions, errors, and field state to a native control', async () => {
  render(FieldState);
  const input = screen.getByRole('textbox', { name: 'Email' });
  const helperText = screen.getByText('Use your work email.');
  const errorText = screen.getByText('Enter a valid email address.');
  const inputLocator = page.getByRole('textbox', { name: 'Email', exact: true });
  await expect.element(inputLocator).toBeDisabled();
  await expect.element(inputLocator).toHaveAttribute('aria-invalid', 'true');
  await expect.poll(() => input.getAttribute('aria-describedby')).toContain(helperText.id);
  await expect
    .poll(() => input.getAttribute('aria-describedby')?.split(' '))
    .toEqual(expect.arrayContaining([helperText.id, errorText.id]));
  await expect.element(inputLocator).toHaveAttribute('required');
  await expect.element(inputLocator).toHaveAttribute('readonly');
  await expect.element(page.getByText('Email', { exact: true })).toHaveAttribute('for', input.id);
});

test('forwards FieldItem refs and uses target for its label wiring', async () => {
  const { component } = render(FieldItemRefs);
  const input = screen.getByRole('textbox', { name: 'Email' });
  expect(component.getItemRef()?.getAttribute('data-slot')).toBe('field-item');
  await expect.element(page.getByText('Email', { exact: true })).toHaveAttribute('for', input.id);
});

test('applies native utilities and lets consumer classes win', async () => {
  const { container } = render(FieldOverride);
  const root = container.querySelector('[data-slot="field-root"]')!;
  const label = container.querySelector('[data-slot="field-label"]')!;
  expect([...root.classList]).toEqual(
    expect.arrayContaining(['w-80', 'max-w-sm', 'gap-4', 'text-primary']),
  );
  expect([...label.classList]).toEqual(expect.arrayContaining(['gap-4', 'text-primary']));
  await expect.element(page.locator('[data-slot="field-root"]')).toHaveCSS('gap', '16px');
});