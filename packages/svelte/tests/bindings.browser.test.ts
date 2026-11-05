import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/svelte';
import Bindings from './bindings/Bindings.svelte';

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