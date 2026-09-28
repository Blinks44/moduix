<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Button } from '@moduix/vue/button';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
  useListboxContext,
} from '@moduix/vue/listbox';
import { computed, defineComponent } from 'vue';
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
const SelectAllMeta = defineComponent({
  components: { Button },
  setup() {
    const listbox = useListboxContext();
    const allValues = days.items.map((item) => item.value);
    const allSelected = computed(() => listbox.value.value.length === allValues.length);
    return { listbox, allSelected, allValues };
  },
  template:
    '<div><output>Selected: {{ listbox.value.length }}</output><Button type="button" @click="listbox.setValue(allSelected ? [] : allValues)">{{ allSelected ? "Clear all" : "Select all" }}</Button></div>',
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
    <SelectAllMeta />
  </Listbox>
</template>