<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@moduix/vue/toggle-group';
import styles from '@/components/examples/toggle-group/toggle-group-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const alignmentItems = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];
</script>

<template>
  <div :class="styles.stack">
    <ToggleGroup
      v-for="size in sizes"
      :key="size"
      :size="size"
      :default-value="['left']"
      :aria-label="`Text alignment, ${size}`"
    >
      <ToggleGroupItem v-for="item in alignmentItems" :key="item.value" :value="item.value">
        {{ item.label }}
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>