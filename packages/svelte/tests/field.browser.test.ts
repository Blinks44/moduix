import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildField from './field/AsChildField.svelte';
import ContextField from './field/ContextField.svelte';
import FieldInvalid from './field/FieldInvalid.svelte';
import FieldRefs from './field/FieldRefs.svelte';
import ProviderField from './field/ProviderField.svelte';
import RequiredField from './field/RequiredField.svelte';

test('renders error text only while invalid', async () => {
  const { rerender } = render(FieldInvalid);
  await expect
    .element(page.getByText('Enter a valid email address.', { exact: true }))
    .toHaveCount(0);
  await rerender({ invalid: true });
  await expect
    .element(page.getByText('Enter a valid email address.', { exact: true }))
    .toHaveAttribute('aria-live', 'polite');
});

test('forwards refs and styling hooks for every part', () => {
  const { component } = render(FieldRefs);
  const refs = component.getRefs();

  expect(refs.root?.getAttribute('data-slot')).toBe('field-root');
  expect(refs.label?.getAttribute('data-slot')).toBe('field-label');
  expect(refs.indicator?.getAttribute('data-slot')).toBe('field-required-indicator');
  expect(refs.helper?.getAttribute('data-slot')).toBe('field-helper-text');
  expect(refs.error?.getAttribute('data-slot')).toBe('field-error-text');
});

test('keeps the RootProvider composition path Ark-shaped', async () => {
  render(ProviderField);
  await expect
    .element(page.getByRole('textbox', { name: 'Email', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
  await expect
    .element(page.getByText('Enter a valid email address.', { exact: true }))
    .toBeVisible();
});

test('exposes the field context through the hook and renderless component', () => {
  render(ContextField);
  expect(screen.getAllByText('required')).toHaveLength(2);
});

test('preserves Ark asChild composition and forwards refs for the root', async () => {
  const { component } = render(AsChildField);

  const root = screen.getByRole('group', { name: 'Email field' });
  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('group', { name: 'Email field', exact: true }))
    .toHaveAttribute('data-slot', 'field-root');
  expect(component.getRootRef()).toBe(root);
  await expect.element(page.getByRole('textbox', { name: 'Email', exact: true })).toBeVisible();
});

test('keeps controlled field props reactive', async () => {
  const { rerender } = render(RequiredField);

  await expect
    .element(page.getByRole('textbox', { name: 'Project key', exact: true }))
    .not.toHaveAttribute('required');
  await rerender({ required: true });
  await expect
    .element(page.getByRole('textbox', { name: 'Project key', exact: true }))
    .toHaveAttribute('required');
});