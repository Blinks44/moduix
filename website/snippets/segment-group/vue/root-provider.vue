<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  SegmentGroupIndicator,
  SegmentGroupItems,
  SegmentGroupRootProvider,
  useSegmentGroup,
} from '@moduix/vue/segment-group';
import styles from '@/components/examples/segment-group/segment-group-root-provider.module.css';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

const segmentGroup = useSegmentGroup({ defaultValue: 'React' });
</script>

<template>
  <div :class="styles.root">
    <SegmentGroupRootProvider aria-label="Framework" :value="segmentGroup">
      <SegmentGroupIndicator />
      <SegmentGroupItems :items="frameworks" />
    </SegmentGroupRootProvider>
    <output>Selected: {{ segmentGroup.value ?? 'none' }}</output>
    <Button type="button" size="sm" @click="segmentGroup.setValue('Solid')"> Set to Solid </Button>
  </div>
</template>