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

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
    { label: 'Grape', value: 'grape' },
    { label: 'Kiwi', value: 'kiwi' },
    { label: 'Mango', value: 'mango' },
    { label: 'Orange', value: 'orange' },
    { label: 'Pineapple', value: 'pineapple' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Watermelon', value: 'watermelon' },
  ],
});
</script>

<template>
  <Select
    :collection="fruits"
    :positioning="{ fitViewport: true, placement: 'bottom-start', sameWidth: true }"
  >
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectControl
      ><SelectTrigger><SelectValueText placeholder="Select an option" /></SelectTrigger
      ><SelectIndicator /><SelectClearTrigger aria-label="Clear selection"
    /></SelectControl>
    <SelectPositioner
      ><SelectContent
        ><SelectItem v-for="item in fruits.items" :key="item.value" :item="item"
          ><SelectItemText>{{ item.label }}</SelectItemText
          ><SelectItemIndicator /></SelectItem></SelectContent
    ></SelectPositioner>
  </Select>
</template>