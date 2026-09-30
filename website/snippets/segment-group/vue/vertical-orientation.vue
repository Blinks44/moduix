<script setup lang="ts">
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/vue/segment-group';
import styles from '@/components/examples/segment-group/segment-group-vertical-orientation.module.css';

const views = [
  { value: 'List', label: 'List' },
  { value: 'Board', label: 'Board' },
  { value: 'Calendar', label: 'Calendar' },
];
</script>

<template>
  <SegmentGroup :class="styles.root" aria-label="View" default-value="List" orientation="vertical">
    <SegmentGroupIndicator />
    <SegmentGroupItems :items="views" />
  </SegmentGroup>
</template>