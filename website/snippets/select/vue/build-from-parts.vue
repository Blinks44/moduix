<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Check as CheckIcon, ChevronsUpDown as ChevronsUpDownIcon, X as XIcon } from '@lucide/vue';
import { CloseButton } from '@moduix/vue/close-button';
import {
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectControl,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem,
  SelectItemGroup,
  SelectItemGroupLabel,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
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
    <SelectControl>
      <SelectTrigger><SelectValueText placeholder="Select an option" /></SelectTrigger>
      <SelectClearTrigger as-child aria-label="Clear selection">
        <CloseButton><XIcon :stroke-width="3" /></CloseButton>
      </SelectClearTrigger>
      <SelectIndicator><ChevronsUpDownIcon :stroke-width="3" /></SelectIndicator>
    </SelectControl>
    <SelectPositioner>
      <SelectContent>
        <SelectItemGroup>
          <SelectItemGroupLabel>Fruits</SelectItemGroupLabel>
          <SelectItem v-for="item in fruits.items" :key="item.value" :item="item">
            <SelectItemText>{{ item.label }}</SelectItemText>
            <SelectItemIndicator><CheckIcon :stroke-width="3" /></SelectItemIndicator>
          </SelectItem>
        </SelectItemGroup>
      </SelectContent>
    </SelectPositioner>
    <SelectHiddenSelect />
  </Select>
</template>