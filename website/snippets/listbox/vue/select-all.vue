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
import SelectAllMeta from './SelectAllMeta.vue';
import styles from '@/components/examples/listbox/listbox-select-all.module.css';

const days = createListCollection({
  items: [
    { label: 'Monday', value: 'mon' },
    { label: 'Tuesday', value: 'tue' },
    { label: 'Wednesday', value: 'wed' },
    { label: 'Thursday', value: 'thu' },
    { label: 'Friday', value: 'fri' },
    { label: 'Saturday', value: 'sat' },
    { label: 'Sunday', value: 'sun' },
  ],
});
</script>

<template>
  <Listbox :collection="days" :class="styles.root" selection-mode="multiple">
    <ListboxLabel>Select days</ListboxLabel>
    <ListboxContent>
      <ListboxItem v-for="item in days.items" :key="item.value" :item="item">
        <ListboxItemText>{{ item.label }}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    </ListboxContent>
    <SelectAllMeta :all-values="days.items.map((item) => item.value)" />
  </Listbox>
</template>