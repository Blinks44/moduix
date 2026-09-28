<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/vue/listbox';
import styles from '@/components/examples/listbox/listbox-extended-selection.module.css';

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
    { label: 'Preact', value: 'preact' },
  ],
});
</script>

<template>
  <Listbox :collection="frameworks" :class="styles.root" selection-mode="extended">
    <ListboxLabel>Hold Cmd or Ctrl to select multiple</ListboxLabel>
    <ListboxContent>
      <ListboxItem v-for="item in frameworks.items" :key="item.value" :item="item">
        <ListboxItemText>{{ item.label }}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    </ListboxContent>
  </Listbox>
</template>