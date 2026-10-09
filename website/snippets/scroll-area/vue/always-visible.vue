<script setup lang="ts">
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@moduix/vue/scroll-area';
import styles from '@/components/examples/scroll-area/scroll-area-always-visible.module.css';

const items = Array.from({ length: 12 }, (_, index) => `Inbox item ${index + 1}`);
</script>

<template>
  <ScrollArea variant="always" :class="styles.root">
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
  </ScrollArea>
</template>