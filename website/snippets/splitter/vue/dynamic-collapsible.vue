<script setup lang="ts">
import {
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterRootProvider,
  useSplitter,
} from '@moduix/vue/splitter';
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import styles from '@/components/examples/splitter/splitter-dynamic-collapsible.module.css';

const rootRef = ref<ComponentPublicInstance>();
const rootSize = ref<number | null>(null);
const isCompact = computed(() => rootSize.value != null && rootSize.value < 520);
const splitter = useSplitter(
  computed(() => ({
    panels: [
      {
        id: 'sidebar',
        collapsible: isCompact.value,
        collapsedSize: 5,
        minSize: 18,
        maxSize: 40,
      },
      { id: 'content', minSize: 40 },
    ],
    defaultSize: [30, 70],
  })),
);

let observer: ResizeObserver | undefined;

onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    rootSize.value = entry?.contentRect.width ?? null;
  });
  const root = rootRef.value?.$el as HTMLElement | undefined;
  if (root) observer.observe(root);
});

onUnmounted(() => observer?.disconnect());

watchEffect(() => {
  if (isCompact.value) splitter.value.collapsePanel('sidebar');
  else splitter.value.expandPanel('sidebar');
});
</script>

<template>
  <SplitterRootProvider ref="rootRef" :value="splitter" :class="styles.root">
    <SplitterPanel id="sidebar" :class="styles.panel">Sidebar</SplitterPanel>
    <SplitterResizeTrigger id="sidebar:content" aria-label="Resize panels" />
    <SplitterPanel id="content" :class="styles.panel">Content</SplitterPanel>
  </SplitterRootProvider>
</template>