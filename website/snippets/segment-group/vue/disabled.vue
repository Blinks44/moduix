<script setup lang="ts">
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/vue/segment-group';
import styles from '@/components/examples/segment-group/segment-group-disabled.module.css';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte', disabled: true },
  { value: 'Vue', label: 'Vue' },
];
</script>

<template>
  <div :class="styles.root">
    <SegmentGroup aria-label="Framework with unavailable item" default-value="React">
      <SegmentGroupIndicator />
      <SegmentGroupItems :items="frameworks" />
    </SegmentGroup>
    <SegmentGroup aria-label="Disabled framework" default-value="React" disabled>
      <SegmentGroupIndicator />
      <SegmentGroupItems :items="frameworks" />
    </SegmentGroup>
  </div>
</template>