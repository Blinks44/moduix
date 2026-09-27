<script setup lang="ts">
import { NativeSelect } from '@moduix/vue/native-select';

const frameworkOptions = [
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

const selectedFrameworks = ['react', 'vue'];
</script>

<template>
  <NativeSelect multiple size="3" aria-label="Frameworks">
    <option
      v-for="option in frameworkOptions"
      :key="option.value"
      :value="option.value"
      :selected="selectedFrameworks.includes(option.value)"
    >
      {{ option.label }}
    </option>
  </NativeSelect>
</template>