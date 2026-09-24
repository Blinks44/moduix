<script setup lang="ts">
import { ChevronRight as ChevronRightIcon } from '@lucide/vue';
import { Badge, BadgeLabel } from '@moduix/vue/badge';
import styles from '@/components/examples/badge/badge-with-icon.module.css';

const labels = {
  release: 'Release',
  details: 'Details',
  more: 'Read more',
};
</script>

<template>
  <div :class="styles.root">
    <Badge variant="default">
      <BadgeLabel>{{ labels.release }}</BadgeLabel>
      <ChevronRightIcon />
    </Badge>
    <Badge variant="secondary">
      <BadgeLabel>{{ labels.details }}</BadgeLabel>
      <ChevronRightIcon />
    </Badge>
    <Badge variant="link" as-child>
      <a href="#styling">
        <BadgeLabel>{{ labels.more }}</BadgeLabel>
        <ChevronRightIcon />
      </a>
    </Badge>
  </div>
</template>