<script setup lang="ts">
import { Tag, TagLabel } from '@moduix/vue/tag';
import styles from '@/components/examples/tag/tag-variants.module.css';

const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;
</script>

<template>
  <div :class="styles.row">
    <Tag v-for="variant in variants" :key="variant" :variant="variant">
      <TagLabel>{{ variant }}</TagLabel>
    </Tag>
  </div>
</template>