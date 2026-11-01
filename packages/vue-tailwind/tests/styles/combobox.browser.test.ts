import { createListCollection } from '@ark-ui/vue/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';
import {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxContext,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemContext,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxItemIndicator,
} from '@/index';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});

const comboboxComponents = {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContent,
  ComboboxContext,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemContext,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
  ComboboxStatus,
  ComboboxTrigger,
} as unknown as Record<string, Component>;

test('supports controlled input v-model updates', async () => {
  const Harness = defineComponent({
    components: comboboxComponents,
    setup() {
      const inputValue = ref('mango');
      return { collection: fruits, inputValue };
    },
    template: `<div><button type="button" @click="inputValue = 'apple'">Set apple</button><Combobox :collection="collection" v-model:input-value="inputValue" :portalled="false"><ComboboxLabel>Controlled fruit</ComboboxLabel><ComboboxControl><ComboboxInput /><ComboboxClearTrigger /></ComboboxControl><ComboboxPositioner><ComboboxContent><ComboboxList><ComboboxOption v-for="item in collection.items" :key="item.value" :item="item">{{ item.label }}</ComboboxOption></ComboboxList></ComboboxContent></ComboboxPositioner></Combobox></div>`,
  });

  render(Harness);

  await expect
    .element(page.getByRole('combobox', { name: 'Controlled fruit', exact: true }))
    .toHaveValue('mango');
  await page.getByRole('button', { name: 'Set apple', exact: true }).click();
  await expect
    .element(page.getByRole('combobox', { name: 'Controlled fruit', exact: true }))
    .toHaveValue('apple');
});

test('preserves semantic hosts with asChild and consumer utility classes', async () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: comboboxComponents,
    setup() {
      return { collection: fruits, rootRef };
    },
    template:
      '<Combobox ref="rootRef" as-child class="consumer-root w-80" :collection="collection"><section aria-label="Fruit selection"><ComboboxLabel class="consumer-label">Fruit</ComboboxLabel><ComboboxControl class="consumer-control"><ComboboxInput class="consumer-input" /></ComboboxControl></section></Combobox>',
  });

  render(Harness);
  const root = screen.getByRole('region', { name: 'Fruit selection' });
  const input = screen.getByRole('combobox', { name: 'Fruit' });
  expect(root.tagName).toBe('SECTION');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['consumer-root']));
  expect(rootRef.value?.$el).toBe(root);
  expect([...screen.getByText('Fruit')!.classList]).toEqual(
    expect.arrayContaining(['consumer-label']),
  );
  expect([...input.parentElement!.classList]).toEqual(expect.arrayContaining(['consumer-control']));
  expect([...input!.classList]).toEqual(expect.arrayContaining(['consumer-input']));
  await expect.element(page.locator('[data-slot="combobox-root"]')).toHaveCSS('width', '320px');
  await expect.element(page.locator('[data-slot="combobox-input"]')).toHaveCSS('height', '36px');
});