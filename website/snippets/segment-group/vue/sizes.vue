<script setup lang="ts">
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/vue/segment-group';
import styles from '@/components/examples/segment-group/segment-group-sizes.module.css';

const sizes = ['sm', 'md', 'lg'] as const;
const frameworks = ['React', 'Solid', 'Vue'];
</script>

<template>
  <div :class="styles.root">
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
  </div>
</template>