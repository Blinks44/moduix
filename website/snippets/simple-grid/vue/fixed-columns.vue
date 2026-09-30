<script setup lang="ts">
import { SimpleGrid } from '@moduix/vue/simple-grid';
import { Text } from '@moduix/vue/text';
import styles from '@/components/examples/simple-grid/simple-grid-fixed-columns.module.css';

const metrics = [
  { label: 'Users', value: '24.8k' },
  { label: 'Sessions', value: '91k' },
  { label: 'Conversion', value: '8.4%' },
  { label: 'Revenue', value: '$42k' },
];
</script>

<template>
  <SimpleGrid :columns="4" gap="var(--moduix-spacing-3)" :class="styles.root">
    <div v-for="metric in metrics" :key="metric.label" :class="styles.metric">
      <Text size="xl" weight="semibold">{{ metric.value }}</Text>
      <Text tone="muted" size="sm">{{ metric.label }}</Text>
    </div>
  </SimpleGrid>
</template>