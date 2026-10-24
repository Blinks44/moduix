<script setup lang="ts">
import { createGridCollection } from '@ark-ui/vue/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/vue/listbox';

const colors = createGridCollection({
  items: [
    { label: 'Red', value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue', value: 'blue' },
  ],
  columnCount: 3,
});
</script>

<template>
  <Listbox :collection="colors">
    <ListboxLabel>Pick a color</ListboxLabel>
    <ListboxContent>
      <ListboxItem v-for="item in colors.items" :key="item.value" :item="item">
        <ListboxItemText>{{ item.label }}</ListboxItemText>
      </ListboxItem>
    </ListboxContent>
  </Listbox>
</template>