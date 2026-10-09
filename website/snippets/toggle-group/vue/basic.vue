<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@moduix/vue/toggle-group';

const alignmentItems = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];
</script>

<template>
  <ToggleGroup :default-value="['left']" aria-label="Text alignment">
    <ToggleGroupItem v-for="item in alignmentItems" :key="item.value" :value="item.value">
      {{ item.label }}
    </ToggleGroupItem>
  </ToggleGroup>
</template>