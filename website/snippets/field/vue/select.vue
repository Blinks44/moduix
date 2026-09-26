<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import {
  SelectContent,
  SelectControl,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@ark-ui/vue/select';
import { Field, FieldHelperText } from '@moduix/vue/field';
import styles from '@/components/examples/field/field-select.module.css';

type Priority = { label: string; value: string };

const priorities = createListCollection<Priority>({
  items: [
    { label: 'Low', value: 'low' },
    { label: 'Normal', value: 'normal' },
    { label: 'High', value: 'high' },
  ],
});
</script>

<template>
  <Field :class="styles.root">
    <SelectRoot :collection="priorities" required name="priority">
      <SelectLabel>Priority</SelectLabel>
      <SelectControl>
        <SelectTrigger><SelectValueText placeholder="Select priority" /></SelectTrigger>
        <SelectIndicator />
      </SelectControl>
      <SelectPositioner>
        <SelectContent>
          <SelectItem v-for="item in priorities.items" :key="item.value" :item="item">
            <SelectItemText>{{ item.label }}</SelectItemText>
            <SelectItemIndicator />
          </SelectItem>
        </SelectContent>
      </SelectPositioner>
      <SelectHiddenSelect />
    </SelectRoot>
    <FieldHelperText>Used for triage queues.</FieldHelperText>
  </Field>
</template>