<script setup lang="ts">
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@moduix/vue/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-both-directions.module.css';

const cells = Array.from({ length: 96 }, (_, index) => index + 1);
</script>

<template>
  <ScrollArea :class="styles.root">
    <ScrollAreaViewport>
      <ScrollAreaContent>
        <div :class="styles.content">
          <div v-for="cell in cells" :key="cell" :class="styles.cell">{{ cell }}</div>
        </div>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar>
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar orientation="horizontal">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</template>