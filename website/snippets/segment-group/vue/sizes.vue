<script setup lang="ts">
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/vue/segment-group';
import { Stack } from '@moduix/vue/stack';

const sizes = ['sm', 'md', 'lg'] as const;
const frameworks = ['React', 'Solid', 'Vue'];
</script>

<template>
  <Stack align="center" gap="3">
    <SegmentGroup
      v-for="size in sizes"
      :key="size"
      :size="size"
      :aria-label="`Framework, ${size}`"
      default-value="React"
    >
      <SegmentGroupIndicator />
      <SegmentGroupItems :items="frameworks" />
    </SegmentGroup>
  </Stack>
</template>