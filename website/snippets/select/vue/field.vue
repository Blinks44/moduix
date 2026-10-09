<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Field, FieldHelperText } from '@moduix/vue/field';
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
import styles from '@/components/examples/select/select-field.module.css';

const frameworks = createListCollection({
  items: [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ],
});
</script>

<template>
  <Field :class="styles.root" required>
    <Select :collection="frameworks" name="framework">
      <SelectLabel>Framework</SelectLabel>
      <SelectControl>
        <SelectTrigger><SelectValueText placeholder="Select framework" /></SelectTrigger>
        <SelectClearTrigger aria-label="Clear selection" />
        <SelectIndicator />
      </SelectControl>
      <SelectPositioner>
        <SelectContent>
          <SelectItem v-for="item in frameworks.items" :key="item.value" :item="item">
            <SelectItemText>{{ item.label }}</SelectItemText>
            <SelectItemIndicator />
          </SelectItem>
        </SelectContent>
      </SelectPositioner>
      <SelectHiddenSelect />
    </Select>
    <FieldHelperText>Pick the framework used by this project.</FieldHelperText>
  </Field>
</template>