<script setup lang="ts">
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
  createListCollection,
} from '@moduix/vue/listbox';
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
  <Listbox :collection="plans">
    <ListboxLabel>Select plan</ListboxLabel>
    <ListboxContent>
      <ListboxItem v-for="item in plans.items" :key="item.value" :item="item">
        <ListboxItemText>{{ item.label }}</ListboxItemText>
        <ListboxItemIndicator />
      </ListboxItem>
    </ListboxContent>
  </Listbox>
</template>