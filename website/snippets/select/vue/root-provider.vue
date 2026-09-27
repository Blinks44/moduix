<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
import { Button } from '@moduix/vue/button';
import {
  useSelect,
  SelectContent,
  SelectField,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPositioner,
  SelectRootProvider,
} from '@moduix/vue/select';
import styles from '@/components/examples/select/select-root-provider.module.css';

const fruits = createListCollection({
  items: [
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
  ],
});
const select = useSelect({ collection: fruits, defaultValue: ['banana'] });
const chooseBanana = () => select.value.setValue(['banana']);
</script>

<template>
  <div :class="styles.root">
    <SelectRootProvider :value="select">
      <SelectLabel>Choose fruit</SelectLabel>
      <SelectField placeholder="Select an option" clear-label="Clear selection" />
      <SelectPositioner
        ><SelectContent
          ><SelectItem v-for="item in fruits.items" :key="item.value" :item="item"
            ><SelectItemText>{{ item.label }}</SelectItemText
            ><SelectItemIndicator /></SelectItem></SelectContent
      ></SelectPositioner>
    </SelectRootProvider>
    <div>
      <output>Selected: {{ select.valueAsString || 'none' }}</output
      ><Button type="button" size="sm" @click="chooseBanana">Select banana</Button>
    </div>
  </div>
</template>