import { createListCollection } from '@ark-ui/solid/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  Listbox,
  ListboxClearTrigger,
  ListboxContent,
  ListboxFilter,
  ListboxInput,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@/index';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
    { label: 'Unavailable', value: 'unavailable', disabled: true },
  ],
});

test('lets consumer utilities replace conflicting defaults', async () => {
  const { container } = render(() => (
    <Listbox collection={fruits} class="w-80">
      <ListboxLabel class="text-lg">Styled fruit</ListboxLabel>
      <ListboxFilter>
        <ListboxInput class="min-h-10" />
        <ListboxClearTrigger class="size-5" />
      </ListboxFilter>
      <ListboxContent class="max-h-80 p-0">
        <ListboxItem item={fruits.items[0]} class="px-0">
          <ListboxItemText>Apple</ListboxItemText>
          <ListboxItemIndicator class="size-5" />
        </ListboxItem>
      </ListboxContent>
    </Listbox>
  ));

  const root = container.querySelector('[data-slot="listbox-root"]')!;
  const label = container.querySelector('[data-slot="listbox-label"]')!;
  const input = container.querySelector('[data-slot="listbox-input"]')!;
  const clearTrigger = container.querySelector('[data-slot="listbox-clear-trigger"]')!;
  const content = container.querySelector('[data-slot="listbox-content"]')!;
  const item = container.querySelector('[data-slot="listbox-item"]')!;
  const indicator = container.querySelector('[data-slot="listbox-item-indicator"]')!;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-80']));
  expect([...label!.classList]).toEqual(expect.arrayContaining(['text-lg']));
  expect([...input!.classList]).toEqual(expect.arrayContaining(['min-h-10']));
  expect([...clearTrigger!.classList]).toEqual(expect.arrayContaining(['size-5']));
  expect([...content!.classList]).toEqual(expect.arrayContaining(['max-h-80', 'p-0']));
  expect([...item!.classList]).toEqual(expect.arrayContaining(['px-0']));
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['size-5']));
  await expect.element(page.locator('[data-slot="listbox-root"]')).toHaveCSS('width', '320px');
  await expect.element(page.locator('[data-slot="listbox-label"]')).toHaveCSS('font-size', '18px');
  await expect.element(page.locator('[data-slot="listbox-input"]')).toHaveCSS('min-height', '40px');
  await expect
    .element(page.locator('[data-slot="listbox-clear-trigger"]'))
    .toHaveCSS('width', '20px');
  await expect
    .element(page.locator('[data-slot="listbox-content"]'))
    .toHaveCSS('padding-top', '0px');
  await expect
    .element(page.locator('[data-slot="listbox-content"]'))
    .toHaveCSS('max-height', '320px');
  await expect.element(page.locator('[data-slot="listbox-item"]')).toHaveCSS('padding-left', '0px');
  await expect
    .element(page.locator('[data-slot="listbox-item-indicator"]'))
    .toHaveCSS('width', '20px');
});