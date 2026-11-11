import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { Listbox, ListboxClearTrigger } from '@/components/listbox';
import BoundListbox from './listbox/BoundListbox.svelte';
import FruitListbox from './listbox/FruitListbox.svelte';
import ProviderListbox from './listbox/ProviderListbox.svelte';
import ValueTextListbox from './listbox/ValueTextListbox.svelte';

test('preserves Ark semantics, stable styling hooks, and the flat API', async () => {
  const { container } = render(FruitListbox, { props: { defaultValue: ['apple'] } });

  const apple = screen.getByRole('option', { name: 'Apple' });

  expect('Root' in Listbox).toBe(false);
  // Ark Svelte's ListboxRoot does not expose a bindable ref, so the host is queried directly.
  expect(container.querySelector('[data-slot="listbox-root"]')).not.toBeNull();
  await expect
    .element(page.getByRole('listbox', { name: 'Fruit', exact: true }))
    .toHaveAttribute('data-slot', 'listbox-content');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-slot', 'listbox-item');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-selected');
  expect(
    Boolean(apple.querySelector('[data-slot="listbox-item-indicator"] svg')?.isConnected),
  ).toBe(true);
});

test('supports controlled values through bind:value', async () => {
  render(BoundListbox);
  await expect
    .element(page.getByRole('option', { name: 'Mango', exact: true }))
    .toHaveAttribute('data-selected');
  await page.getByRole('button', { name: 'Set apple', exact: true }).click();
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-selected');
  await expect
    .element(page.getByRole('option', { name: 'Mango', exact: true }))
    .not.toHaveAttribute('data-selected');
});

test('keeps disabled items unavailable and selects enabled items with the keyboard', async () => {
  render(FruitListbox);

  const apple = screen.getByRole('option', { name: 'Apple' });

  const rootLocator = page.getByRole('listbox', { name: 'Fruit', exact: true });
  await rootLocator.press('Home');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-highlighted');
  await expect.element(rootLocator).toHaveAttribute('aria-activedescendant', apple.id);
  await rootLocator.press('Enter');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-selected');
  await rootLocator.press('ArrowDown');
  await expect
    .element(page.getByRole('option', { name: 'Mango', exact: true }))
    .toHaveAttribute('data-highlighted');
  await expect
    .element(page.getByRole('option', { name: 'Unavailable', exact: true }))
    .toHaveAttribute('data-disabled');
  await expect
    .element(page.getByRole('option', { name: 'Unavailable', exact: true }))
    .not.toHaveAttribute('data-highlighted');
});

test('connects provider hooks and context snippets', async () => {
  render(ProviderListbox);
  await expect.element(page.getByRole('status')).toContainText('mango');
  await expect.element(page.getByText('Mango selected')).toBeAttached();
  expect(screen.getAllByText('mango')).toHaveLength(2);
});

test('updates clear trigger labels without replacing the host', async () => {
  const { rerender } = render(ListboxClearTrigger, { props: { 'aria-label': 'Clear fruit' } });
  const host = screen.getByRole('button', { name: 'Clear fruit' });
  await rerender({ 'aria-label': 'Clear vegetables' });
  await expect
    .element(page.getByRole('button', { name: 'Clear vegetables', exact: true }))
    .toBeAttached();
  expect(screen.getByRole('button', { name: 'Clear vegetables' })).toBe(host);
  await rerender({ 'aria-label': undefined });
  expect(screen.getByRole('button', { name: 'Clear search' })).toBe(host);
});

test('shows the selected value when ValueText has no consumer children', async () => {
  const { rerender } = render(ValueTextListbox);

  await expect.element(page.getByText('Apple')).toHaveAttribute('data-slot', 'listbox-value-text');
  const host = screen.getByTestId('value');
  await rerender({ value: ['mango'] });
  const rootLocator = page.getByTestId('value');
  await expect.element(rootLocator).toContainText('Mango');
  await rerender({ custom: true });
  expect(screen.getByText('Custom value').tagName).toBe('STRONG');
  expect([...screen.getByTestId('value').classList]).toEqual(
    expect.arrayContaining(['consumer-value']),
  );
  await expect.element(rootLocator).toHaveAttribute('title', 'Selected fruit');
  expect(screen.getByTestId('value')).toBe(host);
  await rerender({ custom: false });
  await expect.element(rootLocator).toContainText('Mango');
  expect(screen.queryByText('Custom value')).toBeNull();
  await rerender({ value: [] });
  await expect.element(rootLocator).toContainText('Choose fruit');
  expect(screen.getByTestId('value')).toBe(host);
});

test('renders the consumer-wired clear trigger as an accessible button', async () => {
  render(ListboxClearTrigger, { props: { class: 'consumer-clear' } });
  const clear = screen.getByRole('button', { name: 'Clear search' });
  await expect
    .element(page.getByRole('button', { name: 'Clear search', exact: true }))
    .toHaveAttribute('type', 'button');
  expect(Boolean(clear.querySelector('svg')?.isConnected)).toBe(true);
});