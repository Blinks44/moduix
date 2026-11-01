<script setup lang="ts">
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
} from '@moduix/vue/segment-group';

const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];
</script>

<template>
  <SegmentGroup aria-label="Framework" default-value="React">
    <SegmentGroupIndicator />
    <SegmentGroupItem v-for="framework in frameworks" :key="framework" :value="framework">
      <SegmentGroupItemText>{{ framework }}</SegmentGroupItemText>
      <SegmentGroupItemHiddenInput />
    </SegmentGroupItem>
  </SegmentGroup>
</template>