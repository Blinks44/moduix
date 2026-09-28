<script setup lang="ts">
import { useListCollection } from '@ark-ui/vue/collection';
import {
  Listbox,
  ListboxClearTrigger,
  ListboxContent,
  ListboxEmpty,
  ListboxFilter,
  ListboxInput,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/vue/listbox';
import { ref } from 'vue';
import styles from '@/components/examples/listbox/listbox-filtering.module.css';

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt.js', value: 'nuxtjs' },
  { label: 'Remix', value: 'remix' },
  { label: 'Gatsby', value: 'gatsby' },
  { label: 'Preact', value: 'preact' },
];
const filterText = ref('');
const { collection, filter } = useListCollection({
  initialItems: frameworks,
  filter: (itemText, query) => itemText.toLowerCase().includes(query.toLowerCase()),
});
const updateFilter = (event: Event) => {
  filterText.value = (event.target as HTMLInputElement).value;
  filter(filterText.value);
};
const clearFilter = () => {
  filterText.value = '';
  filter('');
};
</script>

<template>
  <Listbox :collection="collection" :class="styles.root" :typeahead="false">
    <ListboxLabel>Select framework</ListboxLabel>
    <ListboxFilter>
      <ListboxInput placeholder="Search frameworks..." :value="filterText" @input="updateFilter" />
      <ListboxClearTrigger v-if="filterText" @click="clearFilter" />
    </ListboxFilter>
    <ListboxContent>
      <ListboxItem v-for="item in collection.items" :key="item.value" :item="item">
        <ListboxItemText>{{ item.label }}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
      <ListboxEmpty>No frameworks found</ListboxEmpty>
    </ListboxContent>
  </Listbox>
</template>