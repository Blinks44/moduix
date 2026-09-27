<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Button } from '@moduix/vue/button';
import {
  Select,
  SelectClearTrigger,
  SelectContent,
  SelectControl,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from '@moduix/vue/select';
import { ref } from 'vue';
import styles from '@/components/examples/select/select-form-usage.module.css';

const themes = createListCollection({
  items: [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ],
});
const submitted = ref('Nothing submitted');
function handleSubmit(event: Event) {
  submitted.value = String(new FormData(event.currentTarget as HTMLFormElement).get('theme') ?? '');
}
</script>

<template>
  <form :class="styles.root" @submit.prevent="handleSubmit">
    <Select :collection="themes" name="theme" required>
      <SelectLabel>Theme</SelectLabel>
      <SelectControl>
        <SelectTrigger><SelectValueText placeholder="Select theme" /></SelectTrigger>
        <SelectIndicator /><SelectClearTrigger aria-label="Clear selection" />
      </SelectControl>
      <SelectPositioner>
        <SelectContent>
          <SelectItem v-for="item in themes.items" :key="item.value" :item="item">
            <SelectItemText>{{ item.label }}</SelectItemText
            ><SelectItemIndicator />
          </SelectItem>
        </SelectContent>
      </SelectPositioner>
      <SelectHiddenSelect />
    </Select>
    <div>
      <output>Submitted: {{ submitted }}</output
      ><Button type="submit" size="sm">Submit</Button>
    </div>
  </form>
</template>