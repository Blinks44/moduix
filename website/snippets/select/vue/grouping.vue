<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  Select,
  SelectContent,
  SelectField,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
} from '@moduix/vue/select';

const produce = createListCollection({
  items: [
    { label: 'Apple', value: 'apple', type: 'Fruits' },
    { label: 'Mango', value: 'mango', type: 'Fruits' },
    { label: 'Orange', value: 'orange', type: 'Fruits' },
    { label: 'Broccoli', value: 'broccoli', type: 'Vegetables' },
    { label: 'Carrot', value: 'carrot', type: 'Vegetables' },
    { label: 'Spinach', value: 'spinach', type: 'Vegetables' },
  ],
  groupBy: (item) => item.type,
});
const groups = produce.group();
</script>

<template>
  <Select :collection="produce">
    <SelectLabel>Choose produce</SelectLabel>
    <SelectField placeholder="Select item" clear-label="Clear selection" />
    <SelectPositioner>
      <SelectContent>
        <SelectItemGroup v-for="group in groups" :key="group[0]">
          <SelectItemGroupLabel>{{ group[0] }}</SelectItemGroupLabel>
          <SelectItem v-for="item in group[1]" :key="item.value" :item="item">
            <SelectItemText>{{ item.label }}</SelectItemText
            ><SelectItemIndicator />
          </SelectItem>
        </SelectItemGroup>
      </SelectContent>
    </SelectPositioner>
  </Select>
</template>