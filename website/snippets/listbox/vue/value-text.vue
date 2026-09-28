<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
  ListboxValueText,
} from '@moduix/vue/listbox';
import styles from '@/components/examples/listbox/listbox-value-text.module.css';

const countries = createListCollection({
  items: [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
  ],
});
</script>

<template>
  <Listbox :collection="countries" :class="styles.root" :default-value="['ca']">
    <ListboxLabel>Select country</ListboxLabel>
    <ListboxContent>
      <ListboxItem v-for="item in countries.items" :key="item.value" :item="item">
        <ListboxItemText>{{ item.label }}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    </ListboxContent>
    <ListboxValueText placeholder="No country selected" />
  </Listbox>
</template>