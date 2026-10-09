<script setup lang="ts">
import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@moduix/vue/splitter';
import { ref } from 'vue';
import styles from '@/components/examples/splitter/splitter-controlled.module.css';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];
const size = ref([30, 70]);
</script>

<template>
  <div :class="styles.stack">
    <Splitter v-model:size="size" :panels="panels" :class="styles.root">
      <SplitterPanel id="a" :class="styles.panel">A</SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" :class="styles.panel">B</SplitterPanel>
    </Splitter>
    <output :class="styles.status">Sizes: {{ size.join(' / ') }}</output>
  </div>
</template>