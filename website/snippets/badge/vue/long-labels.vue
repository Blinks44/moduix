<script setup lang="ts">
import { Badge, BadgeLabel } from '@moduix/vue/badge';
import styles from '@/components/examples/badge/badge-long-labels.module.css';

const label = 'Ready for stakeholder review after legal approval for production release';
</script>

<template>
  <Badge :class="styles.root" :title="label">
    <BadgeLabel :class="styles.label">{{ label }}</BadgeLabel>
  </Badge>
</template>