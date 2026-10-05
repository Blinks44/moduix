<script setup lang="ts">
import { SegmentGroup, SegmentGroupItems } from '../../src';
</script>

<template>
  <SegmentGroup default-value="React" aria-label="Framework">
    <SegmentGroupItems
      :items="['React', 'Solid', 'Svelte', 'Vue'].map((value) => ({ value, label: value }))"
    />
  </SegmentGroup>
</template>