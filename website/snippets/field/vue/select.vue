<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Field, FieldHelperText } from '@moduix/vue/field';
import {
  Select,
  SelectContent,
  SelectControl,
  SelectHiddenSelect,
  SelectIndicator,
  SelectLabel,
  SelectOption,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from '@moduix/vue/select';
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
    <Select :collection="priorities" required name="priority">
      <SelectLabel>Priority</SelectLabel>
      <SelectControl>
        <SelectTrigger><SelectValueText placeholder="Select priority" /></SelectTrigger>
        <SelectIndicator />
      </SelectControl>
      <SelectPositioner>
        <SelectContent>
          <SelectOption v-for="item in priorities.items" :key="item.value" :item="item">{{
            item.label
          }}</SelectOption>
        </SelectContent>
      </SelectPositioner>
      <SelectHiddenSelect />
    </Select>
    <FieldHelperText>Used for triage queues.</FieldHelperText>
  </Field>
</template>