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
import styles from '@/components/examples/listbox/listbox-disabled-item.module.css';

const plans = createListCollection({
  items: [
    { label: 'Free', value: 'free' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise', disabled: true },
    { label: 'Custom', value: 'custom' },
  ],
});
</script>

<template>
  <Listbox :collection="plans" :class="styles.root">
    <ListboxLabel>Select plan</ListboxLabel>
    <ListboxContent>
      <ListboxItem v-for="item in plans.items" :key="item.value" :item="item">
        <ListboxItemText>{{ item.label }}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    </ListboxContent>
  </Listbox>
</template>