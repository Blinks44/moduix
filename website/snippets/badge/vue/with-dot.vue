<script setup lang="ts">
import { Badge, BadgeDot, BadgeLabel } from '@moduix/vue/badge';
import styles from '@/components/examples/badge/badge-with-dot.module.css';

const statuses = [
  { label: 'Online', variant: 'default' },
  { label: 'Draft', variant: 'secondary' },
  { label: 'Failed', variant: 'destructive' },
] as const;
</script>

<template>
  <div :class="styles.root">
    <Badge v-for="status in statuses" :key="status.label" :variant="status.variant">
      <BadgeDot />
      <BadgeLabel>{{ status.label }}</BadgeLabel>
    </Badge>
  </div>
</template>