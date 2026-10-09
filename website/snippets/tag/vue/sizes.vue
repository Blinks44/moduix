<script setup lang="ts">
import { Tag, TagLabel } from '@moduix/vue/tag';
import styles from '@/components/examples/tag/tag-sizes.module.css';

const sizes = [
  { label: 'Compact', size: 'sm' },
  { label: 'Default', size: 'md' },
] as const;
</script>

<template>
  <div :class="styles.row">
    <Tag v-for="tag in sizes" :key="tag.size" :size="tag.size">
      <TagLabel>{{ tag.label }}</TagLabel>
    </Tag>
  </div>
</template>