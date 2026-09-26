<script setup lang="ts">
import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@moduix/vue/splitter';
import styles from '@/components/examples/splitter/splitter-vertical.module.css';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];
</script>

<template>
  <Splitter orientation="vertical" :panels="panels" :default-size="[45, 55]" :class="styles.root">
    <SplitterPanel id="a" :class="styles.panel">Top</SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
    <SplitterPanel id="b" :class="styles.panel">Bottom</SplitterPanel>
  </Splitter>
</template>