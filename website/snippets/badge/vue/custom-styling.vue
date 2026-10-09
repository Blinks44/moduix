<script setup lang="ts">
import { Badge, BadgeDot, BadgeLabel } from '@moduix/vue/badge';
import styles from '@/components/examples/badge/badge-custom-styling.module.css';
</script>

<template>
  <div :class="styles.root">
    <Badge :class="styles.small">Small</Badge>
    <Badge>Default</Badge>
    <Badge :class="styles.large">Large</Badge>
    <Badge :class="styles.priority">
      <BadgeDot />
      <BadgeLabel>Priority</BadgeLabel>
    </Badge>
  </div>
</template>