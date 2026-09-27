<script setup lang="ts">
import { NativeSelect } from '@moduix/vue/native-select';

const frameworkOptions = [
  {
    value: '',
    label: 'Choose framework',
    disabled: true,
  },
  {
    value: 'react',
    label: 'React',
  },
  {
    value: 'vue',
    label: 'Vue',
  },
  {
    value: 'svelte',
    label: 'Svelte',
  },
];
</script>

<template>
  <NativeSelect aria-label="Framework">
    <option
      v-for="option in frameworkOptions"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </NativeSelect>
</template>