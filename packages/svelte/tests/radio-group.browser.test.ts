import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import BoundRadioGroup from './radio-group/BoundRadioGroup.svelte';
import ContextRadioGroup from './radio-group/ContextRadioGroup.svelte';
import FormRadioGroup from './radio-group/FormRadioGroup.svelte';
import ProviderRadioGroup from './radio-group/ProviderRadioGroup.svelte';
import RefsRadioGroup from './radio-group/RefsRadioGroup.svelte';
import SemanticsRadioGroup from './radio-group/SemanticsRadioGroup.svelte';

test('submits through the convenience option input', async () => {
  render(FormRadioGroup);

  const form = screen.getByTestId('form') as HTMLFormElement;
  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('type', 'radio');
  expect(new FormData(form).get('framework')).toBe('React');
  await page.getByText('Solid', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  expect(new FormData(form).get('framework')).toBe('Solid');
});

test('preserves bind:value, callback details and provider defaults', async () => {
  const details: Array<string | null> = [];
  const { unmount } = render(BoundRadioGroup, { props: { details } });

  await page.getByText('Solid', { exact: true }).click();
  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
  await expect.element(page.getByText('Current value: Solid')).toBeAttached();
  expect(details).toEqual(['Solid']);

  unmount();
  render(ProviderRadioGroup);

  await expect.element(page.getByRole('radio', { name: 'Solid', exact: true })).toBeChecked();
});

test('preserves disabled, read-only, invalid, and required semantics', async () => {
  render(SemanticsRadioGroup);

  await expect
    .element(page.getByRole('radio', { name: 'Disabled option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('radio', { name: 'Read-only option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('radio', { name: 'Read-only option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('radiogroup', { name: 'Read-only framework', exact: true }))
    .toHaveAttribute('aria-readonly', 'true');
  await expect
    .element(page.getByRole('radio', { name: 'Required option', exact: true }))
    .toHaveAttribute('required');
  await expect
    .element(page.getByRole('radio', { name: 'Required option', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
});

test('forwards refs and exposes stable slots on public parts', async () => {
  const { component } = render(RefsRadioGroup);
  const refs = component.getRefs();

  expect(refs.root?.getAttribute('data-slot')).toBe('radio-group-root');
  expect(refs.root?.getAttribute('data-probe')).toBe('root');
  expect(refs.root?.getAttribute('data-orientation')).toBe('horizontal');
  expect(refs.label?.getAttribute('data-slot')).toBe('radio-group-label');
  expect(refs.item?.getAttribute('data-slot')).toBe('radio-group-item');
  expect(refs.control?.getAttribute('data-slot')).toBe('radio-group-item-control');
  expect(refs.text?.getAttribute('data-slot')).toBe('radio-group-item-text');
  expect(refs.indicator?.getAttribute('data-slot')).toBe('radio-group-indicator');
  await expect
    .element(page.getByRole('radio', { name: 'React', exact: true }))
    .toHaveAttribute('type', 'radio');
});

test('connects public context snippets to the provider state', async () => {
  render(ContextRadioGroup);

  await expect.element(page.getByText('Selected: React')).toBeAttached();
  await expect.element(page.getByText('Checked')).toBeAttached();
  await page.getByRole('button', { name: 'Set Solid', exact: true }).click();
  await expect.element(page.getByText('Selected: Solid')).toBeAttached();
  await expect.element(page.getByText('Unchecked')).toBeAttached();
});