<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectControl,
  SelectIndicator,
  SelectLabel,
  SelectOption,
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
        ><SelectOption v-for="item in languages.items" :key="item.value" :item="item">{{
          item.label
        }}</SelectOption></SelectContent
      ></SelectPositioner
    >
  </Select>
</template>