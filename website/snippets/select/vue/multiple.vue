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

const languages = createListCollection({
  items: [
    { label: 'C#', value: 'csharp' },
    { label: 'Go', value: 'go' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Rust', value: 'rust' },
    { label: 'TypeScript', value: 'typescript' },
  ],
});
</script>

<template>
  <Select :collection="languages" multiple :default-value="['javascript', 'typescript']">
    <SelectLabel>Languages</SelectLabel>
    <SelectControl
      ><SelectTrigger><SelectValueText placeholder="Select languages" /></SelectTrigger
      ><SelectIndicator /><SelectClearTrigger aria-label="Clear selection"
    /></SelectControl>
    <SelectPositioner
      ><SelectContent
        ><SelectItem v-for="item in languages.items" :key="item.value" :item="item"
          ><SelectItemText>{{ item.label }}</SelectItemText
          ><SelectItemIndicator /></SelectItem></SelectContent
    ></SelectPositioner>
  </Select>
</template>