<script setup lang="ts">
import {
  createSplitterRegistry,
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
} from '@moduix/vue/splitter';
import { ref } from 'vue';
import styles from '@/components/examples/splitter/splitter-nested.module.css';

const horizontalPanels = [
  { id: 'left', minSize: 20 },
  { id: 'right', minSize: 20 },
];
const verticalPanels = [
  { id: 'top', minSize: 20 },
  { id: 'bottom', minSize: 20 },
];
const registry = createSplitterRegistry();
const verticalSize = ref([50, 50]);
</script>

<template>
  <Splitter
    :panels="horizontalPanels"
    :default-size="[35, 65]"
    :registry="registry"
    :class="styles.root"
  >
    <SplitterPanel id="left" :class="styles.panel">Left</SplitterPanel>
    <SplitterResizeTrigger id="left:right" aria-label="Resize panels" />
    <SplitterPanel id="right">
      <Splitter
        v-model:size="verticalSize"
        orientation="vertical"
        :panels="verticalPanels"
        :registry="registry"
      >
        <SplitterPanel id="top" :class="styles.panel">Top</SplitterPanel>
        <SplitterResizeTrigger id="top:bottom" aria-label="Resize panels" />
        <SplitterPanel id="bottom" :class="styles.panel">Bottom</SplitterPanel>
      </Splitter>
    </SplitterPanel>
  </Splitter>
</template>