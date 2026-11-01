<script setup lang="ts">
import { Stack } from '@moduix/vue/stack';
import { Tag, TagLabel } from '@moduix/vue/tag';

const sizes = [
  { label: 'Compact', size: 'sm' },
  { label: 'Default', size: 'md' },
  { label: 'Large', size: 'lg' },
] as const;
</script>

<template>
  <Stack direction="row" align="center" wrap="wrap" gap="3">
    <Tag v-for="tag in sizes" :key="tag.size" :size="tag.size">
      <TagLabel>{{ tag.label }}</TagLabel>
    </Tag>
  </Stack>
</template>