<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import {
  Listbox,
  ListboxContent,
  ListboxEmpty,
  ListboxInput,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/vue/listbox';
import styles from '@/components/examples/listbox/listbox-standalone-filter-input.module.css';

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Next.js', value: 'nextjs' },
];
const { collection, filter } = useListCollection({
  initialItems: frameworks,
  filter: (itemText, query) => itemText.toLowerCase().includes(query.toLowerCase()),
});
const updateFilter = (event: Event) => filter((event.target as HTMLInputElement).value);
</script>

<template>
  <Listbox :collection="collection" :class="styles.root" :typeahead="false">
    <ListboxLabel>Select framework</ListboxLabel>
    <ListboxInput placeholder="Filter frameworks" @input="updateFilter" />
    <ListboxContent>
      <ListboxItem v-for="item in collection.items" :key="item.value" :item="item">
        <ListboxItemText>{{ item.label }}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
      <ListboxEmpty>No frameworks found</ListboxEmpty>
    </ListboxContent>
  </Listbox>
</template>