<script setup lang="ts">
import { NativeSelect } from '@moduix/vue/native-select';
import { ref } from 'vue';

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

const value = ref('react');
</script>

<template>
  <NativeSelect v-model="value" aria-label="Framework">
    <option v-for="option in frameworkOptions" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </NativeSelect>
</template>