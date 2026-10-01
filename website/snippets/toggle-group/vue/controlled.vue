<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@moduix/vue/toggle-group';
import { ref } from 'vue';
import styles from '@/components/examples/toggle-group/toggle-group-controlled.module.css';

const value = ref<string[]>(['left']);
const alignmentItems = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];
</script>

<template>
  <div :class="styles.stack">
    <ToggleGroup v-model="value" aria-label="Text alignment">
      <ToggleGroupItem v-for="item in alignmentItems" :key="item.value" :value="item.value">
        {{ item.label }}
      </ToggleGroupItem>
    </ToggleGroup>
    <div data-preview-meta>
      <output>Selected: {{ value.join(', ') || 'empty' }}</output>
    </div>
  </div>
</template>