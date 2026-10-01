<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@moduix/vue/toggle-group';

const viewItems = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'map', label: 'Map' },
];
</script>

<template>
  <ToggleGroup
    :default-value="['list']"
    orientation="vertical"
    aria-label="View mode"
    variant="outline"
  >
    <ToggleGroupItem v-for="item in viewItems" :key="item.value" :value="item.value">
      {{ item.label }}
    </ToggleGroupItem>
  </ToggleGroup>
</template>