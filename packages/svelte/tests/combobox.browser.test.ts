import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { Combobox } from '@/components/combobox';
import AsChildCombobox from './combobox/AsChildCombobox.svelte';
import PortalCombobox from './combobox/PortalCombobox.svelte';
import ProviderCombobox from './combobox/ProviderCombobox.svelte';
import RefsCombobox from './combobox/RefsCombobox.svelte';
import TestCombobox from './combobox/TestCombobox.svelte';

test('keeps Ark semantics, form values, anatomy, and flat exports', async () => {
  const { component, container } = render(RefsCombobox);
  const input = screen.getByRole('combobox', { name: 'Fruit' });
  const refs = component.getRefs();
  const root = refs.root as HTMLElement;
  const item = screen.getByRole('option', { name: 'Apple' });

  expect('Root' in Combobox).toBe(false);
  expect(root.getAttribute('data-scope')).toBe('combobox');
  expect(root.getAttribute('data-slot')).toBe('combobox-root');
  expect(refs.input).toBe(input);
  const inputLocator = page.getByRole('combobox', { name: 'Fruit', exact: true });
  await expect.element(inputLocator).toHaveAttribute('data-slot', 'combobox-input');
  await expect.element(inputLocator).toHaveAttribute('data-probe', 'input');
  await expect.element(inputLocator).toHaveValue('Apple');
  expect(refs.item).toBe(item);
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-slot', 'combobox-item');
  expect(item.querySelector('[data-slot="combobox-item-text"]')!.textContent).toContain('Apple');
  expect(
    item.querySelector('[data-slot="combobox-item-indicator"]')!.getAttribute('data-state'),
  ).toBe('checked');
  expect(
    Boolean(item.querySelector('[data-slot="combobox-item-indicator"] svg')?.isConnected),
  ).toBe(true);
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('Apple');
});

test('selects with the keyboard and clears through the default accessible action', async () => {
  const { container } = render(TestCombobox);

  const combobox = page.getByRole('combobox', { name: 'Fruit', exact: true });
  await combobox.click();
  await combobox.press('ArrowDown');
  await combobox.press('Enter');
  await expect.element(combobox).toHaveValue('Apple');

  await page.getByRole('button', { name: 'Clear selection', exact: true }).click();
  await expect.element(combobox).toHaveValue('');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('');
});

test('portals popup content by default and forwards ordinary refs', async () => {
  const { component, container } = render(PortalCombobox);
  // Ark Svelte's Portal mounts its content after a tick.
  const list = await screen.findByRole('listbox');

  expect(component.getRoot()!.getAttribute('data-slot')).toBe('combobox-root');
  expect(container.contains(list)).toBe(false);
  expect(document.body.contains(list)).toBe(true);
});

test('keeps RootProvider, root context, item context, and context snippets connected', async () => {
  render(ProviderCombobox);

  await expect.element(page.getByText('Open', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Open slot', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Not highlighted', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Not highlighted slot', { exact: true })).toBeAttached();
});

test('preserves semantic hosts and refs with asChild', async () => {
  const { component } = render(AsChildCombobox);
  const root = screen.getByRole('region', { name: 'Fruit selection' });

  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Fruit selection', exact: true }))
    .toHaveAttribute('data-slot', 'combobox-root');
  expect(component.getRoot()).toBe(root);
});