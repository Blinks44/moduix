<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectControl,
  SelectIndicator,
  SelectItem,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from '@moduix/vue/select';
import { ref } from 'vue';

const themes = createListCollection({
  items: [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ],
});
const value = ref(['light']);
</script>

<template>
  <Select v-model="value" :collection="themes">
    <SelectLabel>Theme</SelectLabel>
    <SelectControl>
      <SelectTrigger><SelectValueText placeholder="Select theme" /></SelectTrigger>
      <SelectIndicator />
      <SelectClearTrigger aria-label="Clear selection" />
    </SelectControl>
    <SelectPositioner>
      <SelectContent>
        <SelectItem v-for="item in themes.items" :key="item.value" :item="item">
          <SelectItemText>{{ item.label }}</SelectItemText>
          <SelectItemIndicator />
        </SelectItem>
      </SelectContent>
    </SelectPositioner>
  </Select>
</template>