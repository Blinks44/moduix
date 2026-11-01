<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Input } from '@moduix/vue/input';
import {
  Select,
  SelectContent,
  SelectField,
  SelectLabel,
  SelectOption,
  SelectPositioner,
} from '@moduix/vue/select';
import { Stack } from '@moduix/vue/stack';
import { computed, ref } from 'vue';

const fruits = [
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
];
const query = ref('');
const collection = computed(() =>
  createListCollection({
    items: fruits.filter((item) => item.label.toLowerCase().includes(query.value.toLowerCase())),
  }),
);
</script>

<template>
  <Stack gap="3">
    <Input v-model="query" aria-label="Filter fruits" placeholder="Filter fruits" />
    <Select :collection="collection">
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectField placeholder="Select an option" clear-label="Clear selection" />
      <SelectPositioner>
        <SelectContent>
          <SelectOption v-for="item in collection.items" :key="item.value" :item="item">{{
            item.label
          }}</SelectOption>
        </SelectContent>
      </SelectPositioner>
    </Select>
  </Stack>
</template>