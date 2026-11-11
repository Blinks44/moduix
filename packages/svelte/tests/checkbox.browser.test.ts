import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import AsChildCheckbox from './checkbox/AsChildCheckbox.svelte';
import FormCheckbox from './checkbox/FormCheckbox.svelte';
import GroupCheckbox from './checkbox/GroupCheckbox.svelte';
import IconsCheckbox from './checkbox/IconsCheckbox.svelte';
import IndeterminateCheckbox from './checkbox/IndeterminateCheckbox.svelte';
import ProviderCheckbox from './checkbox/ProviderCheckbox.svelte';
import RefsCheckbox from './checkbox/RefsCheckbox.svelte';
import SemanticsCheckbox from './checkbox/SemanticsCheckbox.svelte';

test('submits through explicit Ark inputs for roots', () => {
  const { container } = render(FormCheckbox);

  const form = container.querySelector('form')!;
  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(4);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
    ['frameworks', 'react'],
  ]);
});

test('preserves Ark behavior and semantic asChild composition', async () => {
  render(AsChildCheckbox);

  const checkbox = page.getByRole('checkbox', { name: 'Accept terms', exact: true });
  await expect.element(checkbox).not.toBeChecked();
  await page.getByText('Accept terms', { exact: true }).click();
  await expect.element(checkbox).toBeChecked();
  await expect.element(checkbox).toHaveAttribute('type', 'checkbox');
  await checkbox.press('Space');
  await expect.element(checkbox).not.toBeChecked();
});

test('forwards Svelte refs and exposes stable slots on public parts', () => {
  const { component } = render(RefsCheckbox);
  const refs = component.getRefs();

  expect(refs.root?.getAttribute('data-slot')).toBe('checkbox-root');
  expect(refs.root?.getAttribute('data-size')).toBe('lg');
  expect(refs.control?.getAttribute('data-slot')).toBe('checkbox-control');
  expect(refs.indicator?.getAttribute('data-slot')).toBe('checkbox-indicator');
  expect(refs.label?.getAttribute('data-slot')).toBe('checkbox-label');
  expect(refs.group?.getAttribute('data-slot')).toBe('checkbox-group');
});

test('preserves disabled, read-only, invalid, and required semantics', async () => {
  render(SemanticsCheckbox);

  await page.getByText('Read-only option', { exact: true }).click();
  await page.getByText('Read-only group option', { exact: true }).click();
  await expect
    .element(page.getByRole('checkbox', { name: 'Disabled option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('checkbox', { name: 'Disabled option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('checkbox', { name: 'Read-only option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('checkbox', { name: 'Read-only group option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('checkbox', { name: 'Required option', exact: true }))
    .toHaveAttribute('required');
  await expect
    .element(page.getByRole('checkbox', { name: 'Required option', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
});

test('keeps controlled indeterminate state transitions Ark-shaped', async () => {
  render(IndeterminateCheckbox);

  await expect
    .element(page.locator('[data-slot="checkbox-control"]'))
    .toHaveAttribute('data-state', 'indeterminate');
  await page.locator('[data-slot="checkbox-control"]').click();
  await expect
    .element(page.locator('[data-slot="checkbox-control"]'))
    .toHaveAttribute('data-state', 'checked');
  await expect
    .element(page.getByRole('checkbox', { name: 'Select all', exact: true }))
    .toBeChecked();
});

test('supports bind:value for group state and forwards Ark value details once', async () => {
  const details: string[][] = [];
  render(GroupCheckbox, { props: { details } });

  await page.getByText('Push', { exact: true }).click();
  await expect.element(page.getByText('Selected: email, push', { exact: true })).toBeAttached();
  expect(details).toEqual([['email', 'push']]);
});

test('keeps provider and context composition connected', async () => {
  render(ProviderCheckbox);

  await expect.element(page.getByText('State: checked', { exact: true })).toBeAttached();
  await expect
    .element(page.getByRole('checkbox', { name: 'Provider checkbox', exact: true }))
    .toBeChecked();
});

test('renders the default indicators and allows custom children', async () => {
  render(IconsCheckbox);

  await expect.element(page.getByTestId('custom-icon')).toBeAttached();
  expect(
    document
      .querySelector('[data-slot="checkbox-control"]')!
      .querySelectorAll('[data-slot="checkbox-indicator"] > svg'),
  ).toHaveLength(2);
});