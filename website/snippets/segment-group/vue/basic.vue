<script setup lang="ts">
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/vue/segment-group';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];
</script>

<template>
  <SegmentGroup aria-label="Framework" default-value="React">
    <SegmentGroupIndicator />
    <SegmentGroupItems :items="frameworks" />
  </SegmentGroup>
</template>