<script setup lang="ts">
import { Splitter, SplitterPanel, SplitterResizeTrigger } from '../../src/components/splitter';

const panels = [
  { id: 'a', minSize: 20 },
  { id: 'b', minSize: 20 },
];
</script>

<template>
  <Splitter :panels="panels" :default-size="[40, 60]">
    <SplitterPanel id="a"><button type="button">A</button></SplitterPanel>
    <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
    <SplitterPanel id="b">B</SplitterPanel>
  </Splitter>
</template>