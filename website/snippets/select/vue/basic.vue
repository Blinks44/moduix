<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  Select,
  SelectContent,
  SelectField,
  SelectHiddenSelect,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
} from '@moduix/vue/select';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
  ],
});
</script>

<template>
  <Select :collection="fruits">
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectField placeholder="Select an option" clear-label="Clear selection" />
    <SelectPositioner>
      <SelectContent>
        <SelectItemGroup>
          <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
          <SelectItem v-for="item in fruits.items" :key="item.value" :item="item">
            <SelectItemText>{{ item.label }}</SelectItemText>
            <SelectItemIndicator />
          </SelectItem>
        </SelectItemGroup>
      </SelectContent>
    </SelectPositioner>
    <SelectHiddenSelect />
  </Select>
</template>