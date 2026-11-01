import { createListCollection } from '@ark-ui/solid/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  Select,
  SelectLabel,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectClearTrigger,
  SelectIndicator,
  SelectList,
} from '@/index';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

test('lets consumer utilities replace defaults and keeps visual parts visible', async () => {
  const { container } = render(() => (
    <Select class="w-80" collection={fruits} defaultOpen defaultValue={['apple']} portalled={false}>
      <SelectLabel>Styled fruit</SelectLabel>
      <SelectControl>
        <SelectTrigger class="h-8 rounded-lg">
          <SelectValueText />
        </SelectTrigger>
        <SelectClearTrigger class="size-5" aria-label="Clear styled fruits" />
        <SelectIndicator class="size-6" />
      </SelectControl>
      <SelectPositioner>
        <SelectContent class="p-0">
          <SelectList>
            <SelectItem item={fruits.items[0]} class="px-0">
              <SelectItemText>Apple</SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          </SelectList>
        </SelectContent>
      </SelectPositioner>
    </Select>
  ));

  const root = container.querySelector('[data-slot="select-root"]')!;
  const trigger = container.querySelector('[data-slot="select-trigger"]')!;
  const content = container.querySelector('[data-slot="select-content"]')!;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-80']));
  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['h-8', 'rounded-lg']));
  expect([...content!.classList]).toEqual(expect.arrayContaining(['p-0']));
  await expect.element(page.locator('[data-slot="select-root"]')).toHaveCSS('width', '320px');
  await expect.element(page.locator('[data-slot="select-trigger"]')).toHaveCSS('height', '32px');
  await expect
    .element(page.locator('[data-slot="select-trigger"]'))
    .toHaveCSS('border-top-left-radius', '10px');
  await expect
    .element(page.locator('[data-slot="select-clear-trigger"]'))
    .toHaveCSS('width', '20px');
  await expect.element(page.locator('[data-slot="select-indicator"]')).toHaveCSS('width', '24px');
  await expect
    .element(page.locator('[data-slot="select-content"]'))
    .toHaveCSS('padding-top', '0px');
  await expect.element(page.locator('[data-slot="select-item"]')).toHaveCSS('padding-left', '0px');
});