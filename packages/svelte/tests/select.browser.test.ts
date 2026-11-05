import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import { Select } from '@/components/select';
import AsChildSelect from './select/AsChildSelect.svelte';
import BoundFruitSelect from './select/BoundFruitSelect.svelte';
import FormFruitSelect from './select/FormFruitSelect.svelte';
import FruitSelect from './select/FruitSelect.svelte';
import OptionSelect from './select/OptionSelect.svelte';
import ProviderSelect from './select/ProviderSelect.svelte';
import RefsSelect from './select/RefsSelect.svelte';
import ValueTextSelect from './select/ValueTextSelect.svelte';

test('switches between native value text and optional custom children', async () => {
  const { component, rerender } = render(ValueTextSelect);
  const host = screen.getByTestId('value-text');
  const hostLocator = page.getByTestId('value-text');
  await expect.element(hostLocator).toContainText('Choose fruit');
  await rerender({ value: ['apple'] });
  await expect.element(hostLocator).toContainText('Apple');
  await rerender({ value: ['apple'], custom: true });
  await expect.element(hostLocator).toContainText('Custom value');
  expect(screen.getByTestId('value-text')).toBe(host);
  expect(component.getValueRef()).toBe(host);
  await rerender({ value: ['mango'], custom: false });
  await expect.element(hostLocator).toContainText('Mango');
  await rerender({ value: [] });
  await expect.element(hostLocator).toContainText('Choose fruit');
  expect(screen.getByTestId('value-text')).toBe(host);
  await expect.element(hostLocator).toHaveAttribute('data-slot', 'select-value-text');
  expect([...host.classList]).toEqual(expect.arrayContaining(['consumer-value']));
  expect(component.getValueRef()).toBe(host);
});

test('preserves Ark semantics, Svelte refs, anatomy, attributes, and flat exports', async () => {
  const { component } = render(RefsSelect);

  const item = screen.getByRole('option', { name: 'Apple' });
  const refs = component.getRefs();
  const root = refs.root as HTMLElement;

  expect('Root' in Select).toBe(false);
  expect(root.getAttribute('data-scope')).toBe('select');
  expect(root.getAttribute('data-slot')).toBe('select-root');
  expect(root.getAttribute('data-probe')).toBe('root');
  expect(refs.field?.getAttribute('data-slot')).toBe('select-control');
  expect(refs.item).toBe(item);
  await expect
    .element(page.getByRole('combobox', { name: 'Fruit', exact: true }))
    .toHaveAttribute('data-slot', 'select-trigger');
  await expect
    .element(page.getByRole('combobox', { name: 'Fruit', exact: true }))
    .toHaveAttribute('aria-expanded', 'true');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-slot', 'select-item');
  expect(item.querySelector('[data-slot="select-item-text"]')!.textContent).toContain('Apple');
  await expect.element(page.locator('[data-slot="select-item-indicator"]')).toHaveCount(0);
});

test('renders an option row with a replaceable indicator', async () => {
  const { unmount } = render(OptionSelect);

  await expect.element(page.getByRole('option', { name: 'Apple' })).toBeVisible();

  const [apple, mango] = [...document.querySelectorAll<HTMLElement>('[data-slot="select-item"]')];
  expect(apple!.querySelector('[data-slot="select-item-text"]')!.textContent).toBe('Apple');
  expect(apple!.querySelector('[data-slot="select-item-indicator"] svg')).not.toBeNull();
  expect(mango!.querySelector('[data-slot="select-item-indicator"]')).toBeNull();
  expect(document.querySelector('[data-testid="custom-indicator"]')).toBeNull();
  unmount();

  render(OptionSelect, { props: { customIndicator: true } });
  await expect
    .poll(() => document.querySelector('[data-testid="custom-indicator"]'))
    .not.toBeNull();
});

test('keeps the default indicator outside the trigger button', () => {
  const { container } = render(FruitSelect);
  const control = container.querySelector<HTMLElement>('[data-slot="select-control"]')!;
  const trigger = screen.getByRole('combobox', { name: 'Fruit' });
  const indicator = container.querySelector<HTMLElement>('[data-slot="select-indicator"]')!;
  expect(control.contains(indicator)).toBe(true);
  expect(trigger.contains(indicator)).not.toBe(true);
});

test('selects with the keyboard and clears through the accessible action', async () => {
  const { container } = render(FormFruitSelect, { props: { defaultOpen: false } });

  const combobox = page.getByRole('combobox', { name: 'Fruit', exact: true });
  await combobox.click();
  const listbox = page.locator('[data-slot="select-list"]');
  await expect.element(listbox).toBeFocused();
  await listbox.press('ArrowDown');
  await listbox.press('Enter');
  await expect.element(combobox).toContainText('Apple');
  expect(new FormData(container.querySelector('form')!).get('fruit')).toBe('apple');
  await page.getByRole('button', { name: 'Clear fruit', exact: true }).click();
  await expect.element(combobox).toContainText('Select fruit');
});

test('portals popup content by default and forwards root and field refs', async () => {
  const { component, container } = render(RefsSelect, { props: { portalled: true } });
  // Ark Svelte's Portal mounts its content after a tick.
  const listbox = await screen.findByRole('listbox');
  const refs = component.getRefs();
  expect(refs.root?.getAttribute('data-slot')).toBe('select-root');
  expect(refs.field?.getAttribute('data-slot')).toBe('select-control');
  expect(container.contains(listbox)).toBe(false);
  expect(document.body.contains(listbox)).toBe(true);
});

test('resets an explicit native form control to its default selection', async () => {
  const { container } = render(FormFruitSelect, { props: { defaultValue: ['apple'] } });
  await page.getByRole('option', { name: 'Mango', exact: true }).click();
  await expect
    .poll(() => new FormData(container.querySelector('form')!).get('fruit'))
    .toBe('mango');
  container.querySelector('form')!.reset();
  await expect
    .poll(() => new FormData(container.querySelector('form')!).get('fruit'))
    .toBe('apple');
});

test('supports bind:value and calls onValueChange once', async () => {
  const details: string[][] = [];
  render(BoundFruitSelect, { props: { details } });
  await page.getByRole('combobox', { name: 'Fruit', exact: true }).click();
  await expect.element(page.locator('[data-slot="select-list"]')).toBeFocused();
  await page.getByRole('option', { name: 'Mango', exact: true }).click();
  await expect.element(page.getByText('Value: mango')).toBeAttached();
  expect(details).toEqual([['mango']]);
});

test('keeps provider, context, and item context connected', async () => {
  render(ProviderSelect);
  expect(screen.getAllByText('mango')).toHaveLength(2);
  await expect.element(page.getByText('Not selected', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Selected', { exact: true })).toBeAttached();
  await page.getByRole('button', { name: 'Choose apple', exact: true }).click();
  await expect.poll(() => screen.getAllByText('apple')).toHaveLength(2);
});

test('preserves semantic hosts and refs with asChild', async () => {
  const { component } = render(AsChildSelect);
  const root = screen.getByRole('region', { name: 'Fruit selection' });
  expect(root.tagName).toBe('SECTION');
  await expect
    .element(page.getByRole('region', { name: 'Fruit selection', exact: true }))
    .toHaveAttribute('data-slot', 'select-root');
  expect(component.getRootRef()).toBe(root);
  expect(Boolean(root.querySelector('select')?.isConnected)).toBe(true);
});