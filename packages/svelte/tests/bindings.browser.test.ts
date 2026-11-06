import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import Bindings from './bindings/Bindings.svelte';
import OverlayBindings from './bindings/OverlayBindings.svelte';

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