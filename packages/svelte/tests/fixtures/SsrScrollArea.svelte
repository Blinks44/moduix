<script lang="ts">
  import {
    ScrollArea,
    ScrollAreaContent,
    ScrollAreaCorner,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
  } from '@/components/scroll-area';
</script>

<ScrollArea style="width: 240px; height: 120px">
  <ScrollAreaViewport>
    <ScrollAreaContent style="height: 480px">Server content</ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
  <ScrollAreaCorner />
</ScrollArea>