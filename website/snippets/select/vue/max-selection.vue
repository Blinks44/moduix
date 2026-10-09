<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  Select,
  SelectContent,
  SelectField,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
} from '@moduix/vue/select';
import { computed, ref } from 'vue';

const languages = [
  { label: 'C#', value: 'csharp' },
  { label: 'Go', value: 'go' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Rust', value: 'rust' },
  { label: 'TypeScript', value: 'typescript' },
];
const value = ref(['javascript']);
const collection = computed(() =>
  createListCollection({
    items: languages.map((item) => ({
      ...item,
      disabled: value.value.length >= 3 && !value.value.includes(item.value),
    })),
  }),
);
function updateValue(details: { value: string[] }) {
  if (details.value.length <= 3) value.value = details.value;
}
</script>

<template>
  <Select :collection="collection" :model-value="value" multiple @value-change="updateValue">
    <SelectLabel>Languages</SelectLabel>
    <SelectField placeholder="Select up to 3" clear-label="Clear selection" />
    <SelectPositioner
      ><SelectContent
        ><SelectItem v-for="item in collection.items" :key="item.value" :item="item"
          ><SelectItemText>{{ item.label }}</SelectItemText
          ><SelectItemIndicator /></SelectItem></SelectContent
    ></SelectPositioner>
  </Select>
</template>