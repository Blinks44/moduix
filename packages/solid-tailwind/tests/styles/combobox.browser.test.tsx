import { createListCollection } from '@ark-ui/solid/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxControl,
  ComboboxInput,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxStatus,
  ComboboxTrigger,
} from '@/index';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

test('lets consumer utilities replace defaults and keeps visual parts visible', async () => {
  const { container } = render(() => (
    <Combobox class="w-80" collection={fruits} defaultOpen portalled={false}>
      <ComboboxLabel>Styled fruit</ComboboxLabel>
      <ComboboxControl class="rounded-lg">
        <ComboboxInput class="h-8" />
        <ComboboxClearTrigger class="size-5" aria-label="Clear styled fruits" />
        <ComboboxTrigger class="size-6" aria-label="Open styled fruits" />
      </ComboboxControl>
      <ComboboxPositioner>
        <ComboboxContent class="p-0">
          <ComboboxStatus>Loading options</ComboboxStatus>
          <ComboboxList>
            <ComboboxOption item={fruits.items[0]} class="px-0">
              Apple
            </ComboboxOption>
          </ComboboxList>
        </ComboboxContent>
      </ComboboxPositioner>
    </Combobox>
  ));

  const root = container.querySelector('[data-slot="combobox-root"]')!;
  const control = container.querySelector('[data-slot="combobox-control"]')!;
  const input = container.querySelector('[data-slot="combobox-input"]')!;
  const trigger = container.querySelector('[data-slot="combobox-trigger"]')!;
  const content = container.querySelector('[data-slot="combobox-content"]')!;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-80']));
  expect([...control!.classList]).toEqual(expect.arrayContaining(['rounded-lg']));
  expect([...input!.classList]).toEqual(expect.arrayContaining(['h-8']));
  expect([...trigger!.classList]).toEqual(expect.arrayContaining(['size-6']));
  expect([...content!.classList]).toEqual(expect.arrayContaining(['p-0']));
  await expect.element(page.locator('[data-slot="combobox-root"]')).toHaveCSS('width', '320px');
  await expect
    .element(page.locator('[data-slot="combobox-control"]'))
    .toHaveCSS('border-top-left-radius', '10px');
  await expect.element(page.locator('[data-slot="combobox-input"]')).toHaveCSS('height', '32px');
  await expect
    .element(page.locator('[data-slot="combobox-clear-trigger"]'))
    .toHaveCSS('width', '20px');
  await expect.element(page.locator('[data-slot="combobox-trigger"]')).toHaveCSS('width', '24px');
  await expect
    .element(page.locator('[data-slot="combobox-content"]'))
    .toHaveCSS('padding-top', '0px');
  await expect
    .element(page.locator('[data-slot="combobox-item"]'))
    .toHaveCSS('padding-left', '0px');
});