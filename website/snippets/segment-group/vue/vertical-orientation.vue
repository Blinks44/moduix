<script setup lang="ts">
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/vue/segment-group';
import styles from '@/components/examples/segment-group/segment-group-vertical-orientation.module.css';

const views = ['List', 'Board', 'Calendar'];
</script>

<template>
  <SegmentGroup :class="styles.root" aria-label="View" default-value="List" orientation="vertical">
    <SegmentGroupIndicator />
    <SegmentGroupItems :items="views" />
  </SegmentGroup>
</template>