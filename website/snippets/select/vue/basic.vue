<script setup lang="ts">
import {
  Select,
  SelectDropdown,
  SelectField,
  SelectHiddenSelect,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectLabel,
  SelectOption,
  createListCollection,
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
    <SelectDropdown>
      <SelectItemGroup>
        <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
        <SelectOption v-for="item in fruits.items" :key="item.value" :item="item">
          {{ item.label }}
        </SelectOption>
      </SelectItemGroup>
    </SelectDropdown>
    <SelectHiddenSelect />
  </Select>
</template>