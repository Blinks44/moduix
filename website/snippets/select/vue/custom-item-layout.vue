<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Info } from '@lucide/vue';
import {
  Select,
  SelectContent,
  SelectField,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectItemTextContent,
  SelectItemTextIcon,
  SelectItemTextLabel,
  SelectLabel,
  SelectPositioner,
} from '@moduix/vue/select';

const fruits = createListCollection({
  items: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Blueberry', value: 'blueberry' },
  ],
});
</script>

<template>
  <Select :collection="fruits">
    <SelectLabel>Choose fruit</SelectLabel>
    <SelectField placeholder="Select an option" clear-label="Clear selection" />
    <SelectPositioner>
      <SelectContent>
        <SelectItem v-for="item in fruits.items" :key="item.value" :item="item">
          <SelectItemText>
            <SelectItemTextContent>
              <SelectItemTextIcon><Info aria-hidden="true" /></SelectItemTextIcon>
              <SelectItemTextLabel>{{ item.label }}</SelectItemTextLabel>
            </SelectItemTextContent>
          </SelectItemText>
          <SelectItemIndicator />
        </SelectItem>
      </SelectContent>
    </SelectPositioner>
  </Select>
</template>