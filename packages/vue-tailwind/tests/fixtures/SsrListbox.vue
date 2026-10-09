<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Listbox, ListboxLabel, ListboxContent, ListboxItem } from '../../src/components/listbox';
const collection = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
    { label: 'Unavailable', value: 'unavailable', disabled: true },
  ],
});
const item = collection.items[0];
</script>
<template>
  <Listbox :collection="collection"
    ><ListboxLabel>Server fruit</ListboxLabel
    ><ListboxContent><ListboxItem :item="item">Apple</ListboxItem></ListboxContent></Listbox
  >
</template>