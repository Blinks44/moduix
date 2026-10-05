<script setup lang="ts">
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from '../../src/components/scroll-area';
</script>
<template>
  <ScrollArea style="width: 240px; height: 120px">
    <ScrollAreaViewport>
      <ScrollAreaContent style="height: 480px">Server content</ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</template>