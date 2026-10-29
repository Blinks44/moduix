<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { ToggleGroup, ToggleGroupItem } from '@moduix/vue/toggle-group';

const items = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
];
</script>

<template>
  <Stack align="center" gap="3">
    <ToggleGroup :default-value="['one']" aria-label="Default variant">
      <ToggleGroupItem v-for="item in items" :key="item.value" :value="item.value">{{
        item.label
      }}</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup :default-value="['one']" aria-label="Outline variant" variant="outline">
      <ToggleGroupItem v-for="item in items" :key="item.value" :value="item.value">{{
        item.label
      }}</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup :default-value="['one']" aria-label="Ghost variant" variant="ghost">
      <ToggleGroupItem v-for="item in items" :key="item.value" :value="item.value">{{
        item.label
      }}</ToggleGroupItem>
    </ToggleGroup>
  </Stack>
</template>