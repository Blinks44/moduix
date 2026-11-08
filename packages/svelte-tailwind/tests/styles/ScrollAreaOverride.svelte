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

<ScrollArea class="h-20">
  <ScrollAreaViewport class="rounded-none">
    <ScrollAreaContent>Scrollable content</ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar class="opacity-100">
    <ScrollAreaThumb class="bg-primary" />
  </ScrollAreaScrollbar>
  <ScrollAreaCorner />
</ScrollArea>