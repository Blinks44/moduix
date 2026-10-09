<script setup lang="ts">
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/vue/segment-group';
import { ref } from 'vue';
import styles from '@/components/examples/segment-group/segment-group-controlled.module.css';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

const value = ref<string | null>('React');
</script>

<template>
  <div :class="styles.root">
    <SegmentGroup v-model="value" aria-label="Framework">
      <SegmentGroupIndicator />
      <SegmentGroupItems :items="frameworks" />
    </SegmentGroup>
    <output>Selected: {{ value ?? 'none' }}</output>
  </div>
</template>