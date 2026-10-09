<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { SegmentGroup, SegmentGroupIndicator, SegmentGroupItems } from '@moduix/vue/segment-group';
import { ref } from 'vue';
import styles from '@/components/examples/segment-group/segment-group-conditional-mount.module.css';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

const visible = ref(true);
</script>

<template>
  <div :class="styles.root">
    <SegmentGroup v-if="visible" aria-label="Framework" default-value="React">
      <SegmentGroupIndicator />
      <SegmentGroupItems :items="frameworks" />
    </SegmentGroup>
    <output>Segment group: {{ visible ? 'visible' : 'hidden' }}</output>
    <Button type="button" size="sm" @click="visible = !visible">
      {{ visible ? 'Hide' : 'Show' }}
    </Button>
  </div>
</template>