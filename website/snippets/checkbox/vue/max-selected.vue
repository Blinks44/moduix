<script setup lang="ts">
import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/vue/checkbox';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];
const defaultValue = ['react', 'solid'];
</script>

<template>
  <CheckboxGroup :default-value="defaultValue" :max-selected-values="2" name="frameworks">
    <Checkbox v-for="option in options" :key="option.value" :value="option.value">
      <CheckboxControl />
      <CheckboxLabel>{{ option.label }}</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  </CheckboxGroup>
</template>