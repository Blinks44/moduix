import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import NativeSelectOverride from './NativeSelectOverride.svelte';
import NativeSelectState from './NativeSelectState.svelte';

test('preserves Field state, anatomy, and control styling hooks', async () => {
  render(NativeSelectState);

  const select = screen.getByRole('combobox', { name: 'Framework' });

  const selectLocator = page.getByRole('combobox', { name: 'Framework', exact: true });
  await expect.element(selectLocator).toBeDisabled();
  await expect.element(selectLocator).toHaveAttribute('aria-invalid', 'true');
  await expect.element(selectLocator).toHaveAttribute('required');
  await expect.element(selectLocator).toHaveAttribute('data-part', 'select');
  await expect.element(selectLocator).toHaveAttribute('data-scope', 'field');
  await expect.element(selectLocator).toHaveAttribute('data-slot', 'native-select-root');
  expect([...select.classList]).toEqual(expect.arrayContaining(['consumer-select']));
  expect(select.parentElement?.getAttribute('data-slot')).toBe('native-select-control');
  expect(select.parentElement?.getAttribute('title')).toBe('Native select control');
  expect([...select.parentElement!.classList]).toEqual(
    expect.arrayContaining(['consumer-control']),
  );
  expect(
    select.parentElement?.querySelector('[data-slot="native-select-indicator"] svg')?.isConnected,
  ).toBe(true);
});

test('lets consumer utilities replace defaults and hides the indicator for list controls', async () => {
  render(NativeSelectOverride);

  const control = document.querySelector('[data-slot="native-select-control"]')!;

  expect([...control.classList]).toEqual(expect.arrayContaining(['w-full']));
  await expect.element(page.locator('[data-slot="native-select-indicator"]')).not.toBeVisible();
  const rootLocator = page.getByRole('listbox', { name: 'Frameworks' });
  await expect.element(rootLocator).toHaveCSS('height', '80px');
  await expect.element(rootLocator).toHaveCSS('width', '320px');
  await expect.element(rootLocator).toHaveCSS('padding-left', '0px');
});