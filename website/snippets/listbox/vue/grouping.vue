<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemGroup,
  ListboxItemGroupLabel,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/vue/listbox';
import styles from '@/components/examples/listbox/listbox-grouping.module.css';

const regions = createListCollection({
  items: [
    { label: 'New York', value: 'nyc', region: 'North America' },
    { label: 'Los Angeles', value: 'lax', region: 'North America' },
    { label: 'Toronto', value: 'yyz', region: 'North America' },
    { label: 'London', value: 'lhr', region: 'Europe' },
    { label: 'Paris', value: 'cdg', region: 'Europe' },
    { label: 'Berlin', value: 'ber', region: 'Europe' },
    { label: 'Tokyo', value: 'nrt', region: 'Asia Pacific' },
    { label: 'Singapore', value: 'sin', region: 'Asia Pacific' },
    { label: 'Sydney', value: 'syd', region: 'Asia Pacific' },
  ],
  groupBy: (item) => item.region,
});
</script>

<template>
  <Listbox :collection="regions" :class="styles.root">
    <ListboxLabel>Select region</ListboxLabel>
    <ListboxContent>
      <ListboxItemGroup v-for="[region, items] in regions.group()" :id="region" :key="region">
        <ListboxItemGroupLabel>{{ region }}</ListboxItemGroupLabel>
        <ListboxItem v-for="item in items" :key="item.value" :item="item">
          <ListboxItemText>{{ item.label }}</ListboxItemText>
          <ListboxItemIndicator />
        </ListboxItem>
      </ListboxItemGroup>
    </ListboxContent>
  </Listbox>
</template>