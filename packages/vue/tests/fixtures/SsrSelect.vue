<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  Select,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectList,
  SelectItem,
} from '../../src/components/select';
const collection = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Mango', value: 'mango' },
  ],
});
const items = collection.items;
</script>
<template>
  <Select :collection="collection" default-open :portalled="false">
    <SelectLabel>Server fruit</SelectLabel>
    <SelectField placeholder="Select fruit" />
    <SelectPositioner>
      <SelectContent>
        <SelectList
          ><SelectItem v-for="item in items" :key="item.value" :item="item">{{
            item.label
          }}</SelectItem></SelectList
        >
      </SelectContent>
    </SelectPositioner>
  </Select>
</template>