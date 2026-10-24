<script setup lang="ts">
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/vue/segment-group';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];
</script>

<template>
  <SegmentGroup aria-label="Framework" name="framework" default-value="React" invalid required>
    <SegmentGroupIndicator />
    <SegmentGroupItems :items="frameworks" />
  </SegmentGroup>
</template>