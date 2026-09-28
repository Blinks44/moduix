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
import { ref } from 'vue';
import styles from '@/components/examples/listbox/listbox-controlled.module.css';

const sizes = createListCollection({
  items: [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra Large', value: 'xl' },
  ],
});
const value = ref<string[]>(['md']);
</script>

<template>
  <Listbox v-model="value" :collection="sizes" :class="styles.root">
    <ListboxLabel>Select size</ListboxLabel>
    <ListboxContent>
      <ListboxItem v-for="item in sizes.items" :key="item.value" :item="item">
        <ListboxItemText>{{ item.label }}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    </ListboxContent>
  </Listbox>
</template>