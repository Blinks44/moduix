<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';
import { computed, ref } from 'vue';
import styles from '@/components/examples/checkbox/checkbox-select-all.module.css';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];
const value = ref(['react']);
const allValues = options.map((option) => option.value);
const allSelected = computed(() => value.value.length === allValues.length);
const indeterminate = computed(
  () => value.value.length > 0 && value.value.length < allValues.length,
);
</script>

<template>
  <div :class="styles.root">
    <Checkbox
      :checked="indeterminate ? 'indeterminate' : allSelected"
      @checked-change="value = $event.checked === true ? allValues : []"
    >
      <CheckboxControl />
      <CheckboxLabel>Select all</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
    <CheckboxGroup v-model="value" name="frameworks">
      <Checkbox v-for="option in options" :key="option.value" :value="option.value">
        <CheckboxControl />
        <CheckboxLabel>{{ option.label }}</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    </CheckboxGroup>
  </div>
</template>