import { createListCollection } from '@ark-ui/vue/collection';
import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
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
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
  ComboboxStatus,
  ComboboxTrigger,
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
    template: `<div><Combobox :collection="collection" v-model:input-value="inputValue" :portalled="false"><ComboboxLabel>Controlled fruit</ComboboxLabel><ComboboxControl><ComboboxInput /></ComboboxControl></Combobox><button type="button" @click="inputValue = 'apple'">Set apple</button></div>`,
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