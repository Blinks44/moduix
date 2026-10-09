<script setup lang="ts">
import { ToggleGroupItem, ToggleGroupRootProvider, useToggleGroup } from '@moduix/vue/toggle-group';
import styles from '@/components/examples/toggle-group/toggle-group-advanced-customization.module.css';

const toggleGroup = useToggleGroup({ defaultValue: ['left'] });
const alignmentItems = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];
</script>

<template>
  <div :class="styles.stack">
    <ToggleGroupRootProvider :value="toggleGroup" aria-label="Text alignment">
      <ToggleGroupItem v-for="item in alignmentItems" :key="item.value" :value="item.value">
        {{ item.label }}
      </ToggleGroupItem>
    </ToggleGroupRootProvider>
    <div data-preview-meta>
      <output>Selected: {{ toggleGroup.value.join(', ') || 'empty' }}</output>
    </div>
  </div>
</template>