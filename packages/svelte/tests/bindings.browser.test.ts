import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import Bindings from './bindings/Bindings.svelte';
import ComboboxBindings from './bindings/ComboboxBindings.svelte';
import JsonTreeViewBindings from './bindings/JsonTreeViewBindings.svelte';
import ListboxBindings from './bindings/ListboxBindings.svelte';
import OverlayBindings from './bindings/OverlayBindings.svelte';
import PaginationBindings from './bindings/PaginationBindings.svelte';
import TagsInputBindings from './bindings/TagsInputBindings.svelte';
import TreeViewBindings from './bindings/TreeViewBindings.svelte';

const input = (selector: string) => document.querySelector<HTMLInputElement>(selector)!;
const pressArrowRight = (selector: string) => {
  const element = input(selector);
  element.focus();
  element.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }));
};

test('writes to bound state reach the controls', async () => {
  const { component } = render(Bindings);

  component.write();

  await expect.poll(() => input('[data-testid="checkbox"] input').checked).toBe(true);
  await expect.poll(() => input('[data-testid="switch"] input').checked).toBe(true);
  await expect.element(page.getByLabel('Input', { exact: true })).toHaveValue('ext');
  await expect.element(page.getByLabel('Textarea', { exact: true })).toHaveValue('ext');
  await expect.element(page.getByLabel('Select', { exact: true })).toHaveValue('vue');
  await expect.element(page.getByLabel('Number', { exact: true })).toHaveValue('5');
  await expect
    .element(page.getByLabel('Password', { exact: true }))
    .toHaveAttribute('type', 'text');
  await expect.element(page.getByLabel('Editable', { exact: true })).toHaveValue('ext');
  await expect.poll(() => input('[data-testid="slider"] input').value).toBe('50');
  await expect.poll(() => input('[data-testid="radio"] input:checked').value).toBe('b');
  await expect.poll(() => input('[data-testid="segment"] input:checked').value).toBe('b');
  await expect.poll(() => input('[data-testid="rating"] input').value).toBe('3');
  await expect.poll(() => input('[data-testid="angle"] input').value).toBe('90');
  await expect
    .poll(() =>
      Array.from(
        document.querySelectorAll<HTMLInputElement>('[data-testid="pin"] [data-part="input"]'),
      ).map((pin) => pin.value),
    )
    .toEqual(['7', '8', '9']);
});

test('user changes reach bound state', async () => {
  const { component } = render(Bindings);

  await page.getByText('Checkbox', { exact: true }).click();
  await page.getByText('Switch', { exact: true }).click();
  await page.getByLabel('Input', { exact: true }).fill('typed');
  await page.getByLabel('Textarea', { exact: true }).fill('typed');
  await page.getByLabel('Select', { exact: true }).selectOption('vue');
  await page.getByLabel('Number', { exact: true }).fill('42');
  input('[aria-label="Number"]').blur();
  await page.getByText('Radio b', { exact: true }).click();
  await page.getByText('Segment b', { exact: true }).click();
  await page.getByLabel('Toggle', { exact: true }).click();
  await page.locator('[data-testid="pin"] [data-part="input"]').nth(1).fill('4');
  input('[data-testid="rating"] [data-part="item"]:nth-child(4)').click();
  pressArrowRight('[data-testid="slider"] [data-part="thumb"]');
  pressArrowRight('[data-testid="angle"] [data-part="thumb"]');

  await expect
    .poll(() => component.read())
    .toMatchObject({
      angle: 11,
      area: 'typed',
      checked: true,
      num: '42',
      pin: ['1', '4', ''],
      radio: 'b',
      rate: 4,
      seg: 'b',
      sel: 'vue',
      slide: [11],
      sw: true,
      text: 'typed',
      vis: true,
    });
});

test.each([
  { key: 'popover', testid: 'popover-content' },
  { key: 'tooltip', testid: 'tooltip-content' },
  { key: 'hoverCard', testid: 'hover-card-content' },
  { key: 'menu', testid: 'menu-content' },
  { key: 'drawer', testid: 'drawer-content' },
  { key: 'panel', testid: 'panel-content' },
  { key: 'lightbox', testid: 'lightbox-content' },
] as const)('writes to bound overlay state reach the overlay ($key)', async ({ key, testid }) => {
  const { component } = render(OverlayBindings);
  component.write(key);
  await expect.element(page.getByTestId(testid)).toBeAttached();
  if (key === 'popover') {
    await expect
      .element(page.getByRole('button', { name: 'Popover b' }))
      .toHaveAttribute('data-current');
  }
  if (key === 'panel') {
    const panel = () => document.querySelector<HTMLElement>('[data-testid="panel-content"]')!;
    const initialWidth = panel().offsetWidth;
    component.resizePanel();
    await expect.poll(() => panel().offsetWidth).not.toBe(initialWidth);
  }
});

test.each([
  { key: 'popover', action: 'click', name: 'Popover a' },
  { key: 'tooltip', action: 'focus', name: 'Tooltip trigger' },
  { key: 'hoverCard', action: 'focus', name: 'Hover card trigger' },
  { key: 'menu', action: 'click', name: 'Menu trigger' },
  { key: 'drawer', action: 'click', name: 'Drawer trigger' },
  { key: 'panel', action: 'click', name: 'Panel trigger' },
  { key: 'lightbox', action: 'click', name: 'Lightbox trigger' },
] as const)('user actions reach bound overlay state ($key)', async ({ key, action, name }) => {
  const { component } = render(OverlayBindings);
  const trigger = page.getByRole('button', { name, exact: true });
  if (action === 'click') await trigger.click();
  else await trigger.focus();
  await expect.poll(() => component.read()[key]).toBe(true);
  if (key === 'popover') expect(component.read().popoverTrigger).toBe('a');
});

test('writes to bound combobox state reach the control', async () => {
  const { component } = render(ComboboxBindings);
  const input = page.getByRole('combobox', { name: 'Fruit', exact: true });
  component.write('inputValue');
  await expect.element(input).toHaveValue('ext');
  component.write('open');
  await expect.element(page.getByRole('option', { name: 'Apple', exact: true })).toBeVisible();
  component.write('value');
  await expect
    .element(page.getByRole('option', { name: 'Mango', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  component.write('highlightedValue');
  await expect
    .element(page.getByRole('option', { name: 'Apple', exact: true }))
    .toHaveAttribute('data-highlighted');
});

test('user actions reach bound combobox state', async () => {
  const { component } = render(ComboboxBindings);
  await page.getByRole('button', { name: 'Open fruits', exact: true }).click();
  await expect.poll(() => component.read().open).toBe(true);
  await page.getByRole('option', { name: 'Mango', exact: true }).hover();
  await expect.poll(() => component.read().highlightedValue).toBe('mango');
  await page.getByRole('option', { name: 'Mango', exact: true }).click();
  await expect.poll(() => component.read().value).toEqual(['mango']);
  await page.getByRole('combobox', { name: 'Fruit', exact: true }).fill('ap');
  await expect.poll(() => component.read().inputValue).toBe('ap');
});

test('writes to bound listbox state reach the control', async () => {
  const { component } = render(ListboxBindings);
  component.write('value');
  await expect
    .element(page.getByRole('option', { name: 'Mango', exact: true }))
    .toHaveAttribute('data-selected');
  component.write('highlightedValue');
  await page.getByRole('listbox', { name: 'Fruit', exact: true }).focus();
  await expect
    .element(page.getByRole('listbox', { name: 'Fruit', exact: true }))
    .toHaveAttribute('aria-activedescendant', /item:mango$/);
});

test('user actions reach bound listbox state', async () => {
  const { component } = render(ListboxBindings);
  await page.getByRole('option', { name: 'Apple', exact: true }).click();
  await expect.poll(() => component.read().value).toEqual(['apple']);
  await expect.poll(() => component.read().highlightedValue).toBe('apple');
});

test('writes to bound tags input state reach the control', async () => {
  const { component } = render(TagsInputBindings);
  component.write('value');
  await expect.element(page.getByText('Solid', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Vue', { exact: true })).toBeAttached();
  await expect.element(page.getByText('React', { exact: true })).toHaveCount(0);
  component.write('inputValue');
  await expect
    .element(page.getByRole('textbox', { name: 'Frameworks', exact: true }))
    .toHaveValue('ext');
});

test('user actions reach bound tags input state', async () => {
  const { component } = render(TagsInputBindings);
  const input = page.getByRole('textbox', { name: 'Frameworks', exact: true });
  await input.fill('Solid');
  await expect.poll(() => component.read().inputValue).toBe('Solid');
  await input.press('Enter');
  await expect.poll(() => component.read().value).toEqual(['React', 'Solid']);
  await expect.poll(() => component.read().inputValue).toBe('');
});

const readmeItem = page.locator(
  '[data-scope="tree-view"][data-part="item"][data-value="README.md"]',
);

test.each([
  {
    key: 'expandedValue',
    assert: async () => {
      await expect
        .element(page.getByRole('treeitem', { name: 'App.tsx', exact: true }))
        .toBeVisible();
    },
  },
  {
    key: 'selectedValue',
    assert: async () => {
      await expect.element(readmeItem).toHaveAttribute('aria-selected', 'true');
    },
  },
  {
    key: 'focusedValue',
    assert: async () => {
      await expect.element(readmeItem).toHaveAttribute('tabindex', '0');
    },
  },
  {
    key: 'checkedValue',
    assert: async () => {
      await expect
        .element(page.getByRole('checkbox', { name: 'Check README', exact: true }))
        .toHaveAttribute('aria-checked', 'true');
    },
  },
] as const)('writes to bound tree view state reach the control ($key)', async ({ key, assert }) => {
  const { component } = render(TreeViewBindings);
  component.write(key);
  await assert();
});

test('user actions reach bound tree view state', async () => {
  const { component } = render(TreeViewBindings);
  await page.getByRole('button', { name: 'src', exact: true }).click();
  await expect.poll(() => component.read().expandedValue).toEqual(['src']);
  await readmeItem.click();
  await expect.poll(() => component.read().selectedValue).toEqual(['README.md']);
  await expect.poll(() => component.read().focusedValue).toBe('README.md');
  await page.getByRole('checkbox', { name: 'Check README', exact: true }).click();
  await expect.poll(() => component.read().checkedValue).toEqual(['README.md']);
});

test('bound JSON tree view state round-trips', async () => {
  const { component } = render(JsonTreeViewBindings);
  const branch = page.getByRole('button').nth(0);
  const nodeValue = document
    .querySelector('[data-part="branch-control"]')!
    .getAttribute('data-value')!;
  expect(nodeValue).not.toBeNull();

  await expect.element(branch).toHaveAttribute('data-state', 'closed');
  await branch.click();
  await expect.element(branch).toHaveAttribute('data-state', 'open');
  await expect.poll(() => component.read().expandedValue).toEqual([nodeValue]);
  await expect.poll(() => component.read().selectedValue).toEqual([nodeValue]);
  await expect.poll(() => component.read().focusedValue).toBe(nodeValue);

  component.write('expandedValue', 'missing');
  await expect.element(branch).toHaveAttribute('data-state', 'closed');
  component.write('selectedValue', nodeValue);
  await expect.element(branch).toHaveAttribute('data-selected');
  component.write('checkedValue', nodeValue);
  await expect.poll(() => component.read().checkedValue).toEqual([nodeValue]);
});

test('writes to bound pagination state reach the control', async () => {
  const { component } = render(PaginationBindings);
  component.write('page');
  await expect.element(page.getByText('Page 3 of 5')).toBeAttached();
  component.write('pageSize');
  await expect.element(page.getByText('Page 3 of 10')).toBeAttached();
});

test('user actions reach bound pagination state', async () => {
  const { component } = render(PaginationBindings);
  await page.getByRole('button', { name: /page 2/i, exact: true }).click();
  await expect.poll(() => component.read().page).toBe(2);
  await page.getByRole('button', { name: 'Change page size', exact: true }).click();
  await expect.poll(() => component.read().pageSize).toBe(20);
});