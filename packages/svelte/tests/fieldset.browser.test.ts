import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import DisabledFieldset from './fieldset/DisabledFieldset.svelte';
import FieldsetAsChild from './fieldset/FieldsetAsChild.svelte';
import FieldsetInvalid from './fieldset/FieldsetInvalid.svelte';
import ProviderFieldset from './fieldset/ProviderFieldset.svelte';

test('updates invalid state and connects legend, description, and error text', async () => {
  const { rerender } = render(FieldsetInvalid);
  const fieldset = screen.getByRole('group', { name: 'Contact details' });
  const helperText = screen.getByText('We only use these details to contact you.');
  await expect
    .element(page.getByRole('group', { name: 'Contact details' }))
    .not.toHaveAttribute('data-invalid');
  const textLocator = page.getByText('Enter a valid email address.', { exact: true });
  await expect.element(textLocator).toHaveCount(0);
  await rerender({ invalid: true });
  await expect.element(textLocator).toBeVisible();
  const errorText = screen.getByText('Enter a valid email address.');
  await expect
    .element(page.getByRole('group', { name: 'Contact details' }))
    .toHaveAttribute('data-invalid');
  await expect.poll(() => fieldset.getAttribute('aria-describedby')).toContain(helperText.id);
  await expect.poll(() => fieldset.getAttribute('aria-describedby')).toContain(errorText.id);
  await expect.element(textLocator).toHaveAttribute('aria-live', 'polite');
});

test('disables native descendants', async () => {
  render(DisabledFieldset);

  await expect.element(page.getByRole('textbox', { name: 'Street', exact: true })).toBeDisabled();
});

test('preserves native composition and forwards refs through asChild', () => {
  const { component } = render(FieldsetAsChild);
  const refs = component.getRefs();

  expect(refs.rootRef).toBe(screen.getByRole('group', { name: 'Account details' }));
  expect(refs.rootRef?.getAttribute('data-slot')).toBe('fieldset-root');
  expect(refs.legendRef?.getAttribute('data-slot')).toBe('fieldset-legend');
});

test('keeps RootProvider and state context exports Ark-shaped', async () => {
  render(ProviderFieldset);

  await expect
    .element(page.getByRole('group', { name: 'Account details', exact: true }))
    .toHaveAttribute('data-slot', 'fieldset-root-provider');
  await expect.element(page.getByTestId('render-prop-state')).toContainText('true');
  await expect.element(page.getByTestId('hook-state')).toContainText('true');
});