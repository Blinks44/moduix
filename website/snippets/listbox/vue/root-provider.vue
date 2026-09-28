<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Button } from '@moduix/vue/button';
import {
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
  ListboxRootProvider,
  useListbox,
} from '@moduix/vue/listbox';
import styles from '@/components/examples/listbox/listbox-root-provider.module.css';

const priorities = createListCollection({
  items: [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ],
});
const listbox = useListbox({ collection: priorities });
</script>

<template>
  <div :class="styles.stack">
    <ListboxRootProvider :value="listbox" :class="styles.root">
      <ListboxLabel>Select priority</ListboxLabel>
      <ListboxContent>
        <ListboxItem v-for="item in priorities.items" :key="item.value" :item="item">
          <ListboxItemText>{{ item.label }}</ListboxItemText>
          <ListboxItemIndicator />
        </ListboxItem>
      </ListboxContent>
    </ListboxRootProvider>
    <div>
      <output>Selected: {{ listbox.value[0] ?? 'none' }}</output>
      <Button type="button" @click="listbox.setValue(['high'])">Set to high</Button>
    </div>
  </div>
</template>