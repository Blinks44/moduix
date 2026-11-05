import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildSwitch from './switch/AsChildSwitch.svelte';
import BoundSwitch from './switch/BoundSwitch.svelte';
import FormSwitch from './switch/FormSwitch.svelte';
import ProviderSwitch from './switch/ProviderSwitch.svelte';
import SemanticsSwitch from './switch/SemanticsSwitch.svelte';

test('submits through explicit Ark inputs for roots', () => {
  const { container } = render(FormSwitch);

  const form = container.querySelector('form')!;
  expect(container.querySelectorAll('input[type="checkbox"]')).toHaveLength(2);
  expect(Array.from(new FormData(form).entries())).toEqual([
    ['notifications', 'email'],
    ['provider-notifications', 'on'],
  ]);
});

test('preserves Ark behavior and semantic asChild composition', async () => {
  const { component } = render(AsChildSwitch);

  const switchInput = screen.getByRole('checkbox', { name: 'Enable reminders' });
  const switchInputLocator = page.getByRole('checkbox', { name: 'Enable reminders', exact: true });
  await expect.element(switchInputLocator).not.toBeChecked();
  await page.getByText('Enable reminders', { exact: true }).click();
  await expect.element(switchInputLocator).toBeChecked();
  await expect.element(switchInputLocator).toHaveAttribute('type', 'checkbox');
  expect(component.getRootRef()).toBe(switchInput.closest('label'));
});

test('preserves disabled, read-only, invalid, and required semantics', async () => {
  render(SemanticsSwitch);

  const readOnly = screen.getByRole('checkbox', { name: 'Read-only option' });
  await page.getByText('Read-only option', { exact: true }).click();
  await expect
    .element(page.getByRole('checkbox', { name: 'Disabled option', exact: true }))
    .not.toBeChecked();
  await expect
    .element(page.getByRole('checkbox', { name: 'Disabled option', exact: true }))
    .toBeDisabled();
  await expect
    .element(page.getByRole('checkbox', { name: 'Read-only option', exact: true }))
    .not.toBeChecked();
  expect(readOnly.closest('[data-slot="switch-root"]')!.hasAttribute('data-readonly')).toBe(true);
  await expect
    .element(page.getByRole('checkbox', { name: 'Required option', exact: true }))
    .toHaveAttribute('required');
  await expect
    .element(page.getByRole('checkbox', { name: 'Required option', exact: true }))
    .toHaveAttribute('aria-invalid', 'true');
});

test('supports controlled bind:checked and preserves Ark details', async () => {
  const details: boolean[] = [];
  render(BoundSwitch, { props: { details } });

  await expect
    .element(page.locator('[data-slot="switch-control"]'))
    .toHaveAttribute('data-invalid');
  await expect
    .element(page.locator('[data-slot="switch-control"]'))
    .toHaveAttribute('data-state', 'unchecked');
  await page.locator('[data-slot="switch-control"]').click();
  await expect
    .element(page.locator('[data-slot="switch-control"]'))
    .toHaveAttribute('data-state', 'checked');
  await expect
    .element(page.getByRole('checkbox', { name: 'Enable alerts', exact: true }))
    .toBeChecked();
  expect(details).toEqual([true]);
});

test('keeps provider and context composition connected', async () => {
  render(ProviderSwitch);

  await expect.element(page.getByText('State: checked', { exact: true })).toBeAttached();
  await page.getByText('Provider switch', { exact: true }).click();
  await expect.element(page.getByText('State: unchecked', { exact: true })).toBeAttached();
});