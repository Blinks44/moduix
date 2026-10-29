<script setup lang="ts">
import { NativeSelect } from '@moduix/vue/native-select';

const groups = [
  { label: 'Frontend', options: ['React', 'Solid', 'Vue'] },
  { label: 'Backend', options: ['Node.js', 'Go', 'Rust'] },
];
</script>

<template>
  <NativeSelect aria-label="Technology">
    <optgroup v-for="group in groups" :key="group.label" :label="group.label">
      <option v-for="option in group.options" :key="option" :value="option">
        {{ option }}
      </option>
    </optgroup>
  </NativeSelect>
</template>