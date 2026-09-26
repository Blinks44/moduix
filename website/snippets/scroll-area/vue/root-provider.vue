<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaRootProvider,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  useScrollArea,
} from '@moduix/vue/scroll-area';
import { ref } from 'vue';
import styles from '@/components/examples/scroll-area/scroll-area-root-provider.module.css';

const items = Array.from({ length: 12 }, (_, index) => `Activity item ${index + 1}`);
const scrollArea = useScrollArea();
const edge = ref('top');

const scrollToEdge = (nextEdge: 'top' | 'bottom') => {
  scrollArea.value.scrollToEdge({ edge: nextEdge });
  edge.value = nextEdge;
};
</script>

<template>
  <div :class="styles.root">
    <ScrollAreaRootProvider :class="styles.scrollArea" :value="scrollArea">
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div :class="styles.content">
            <div v-for="item in items" :key="item" :class="styles.item">{{ item }}</div>
          </div>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRootProvider>
    <output>Current edge: {{ edge }}</output>
    <Button type="button" size="sm" variant="outline" @click="scrollToEdge('top')">Top</Button>
    <Button type="button" size="sm" variant="outline" @click="scrollToEdge('bottom')"
      >Bottom</Button
    >
  </div>
</template>