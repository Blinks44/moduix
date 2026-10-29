<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { ToggleGroupItem, ToggleGroupRootProvider, useToggleGroup } from '@moduix/vue/toggle-group';

const toggleGroup = useToggleGroup({ defaultValue: ['left'] });
const alignmentItems = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];
</script>

<template>
  <Stack align="center" gap="3">
    <ToggleGroupRootProvider :value="toggleGroup" aria-label="Text alignment">
      <ToggleGroupItem v-for="item in alignmentItems" :key="item.value" :value="item.value">
        {{ item.label }}
      </ToggleGroupItem>
    </ToggleGroupRootProvider>
    <div data-preview-meta>
      <output>Selected: {{ toggleGroup.value.join(', ') || 'empty' }}</output>
    </div>
  </Stack>
</template>