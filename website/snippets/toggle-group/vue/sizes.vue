<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { ToggleGroup, ToggleGroupItem } from '@moduix/vue/toggle-group';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const alignmentItems = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];
</script>

<template>
  <Stack align="center" gap="3">
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
  </Stack>
</template>