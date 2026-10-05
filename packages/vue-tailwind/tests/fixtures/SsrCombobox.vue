<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  Combobox,
  ComboboxLabel,
  ComboboxControl,
  ComboboxInput,
  ComboboxPositioner,
  ComboboxContent,
  ComboboxList,
  ComboboxOption,
} from '../../src/components/combobox';
const collection = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});
const item = collection.items[0];
</script>
<template>
  <Combobox :collection="collection" default-open :portalled="false"
    ><ComboboxLabel>Server fruit</ComboboxLabel><ComboboxControl><ComboboxInput /></ComboboxControl
    ><ComboboxPositioner
      ><ComboboxContent
        ><ComboboxList
          ><ComboboxOption :item="item">Apple</ComboboxOption></ComboboxList
        ></ComboboxContent
      ></ComboboxPositioner
    ></Combobox
  >
</template>