<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Button } from '@moduix/vue/button';
import {
  useSelect,
  SelectContent,
  SelectField,
  SelectLabel,
  SelectPositioner,
  SelectRootProvider,
  SelectOption,
} from '@moduix/vue/select';
import styles from '@/components/examples/select/select-select-all.module.css';

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
const select = useSelect({ collection: languages, multiple: true });
function selectAll() {
  select.value.selectAll();
  select.value.setOpen(false);
}
</script>

<template>
  <div :class="styles.root">
    <SelectRootProvider :value="select">
      <SelectLabel>Languages</SelectLabel>
      <SelectField placeholder="Select languages" clear-label="Clear selection" />
      <SelectPositioner
        ><SelectContent
          ><SelectOption v-for="item in languages.items" :key="item.value" :item="item">{{
            item.label
          }}</SelectOption></SelectContent
        ></SelectPositioner
      >
    </SelectRootProvider>
    <div>
      <output>Selected: {{ select.value.length }}</output
      ><Button type="button" size="sm" @click="selectAll">Select all</Button>
    </div>
  </div>
</template>