<script lang="ts">
  import {
    ScrollArea,
    ScrollAreaContent,
    ScrollAreaCorner,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
  } from '@/components/scroll-area';

  let rootRef: Element | null = $state(null);
  let viewportRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, viewportRef });
</script>

<ScrollArea
  bind:ref={rootRef}
  data-slot="consumer-root"
  data-variant="consumer"
  fade
  variant="always"
>
  <ScrollAreaViewport bind:ref={viewportRef} data-slot="consumer-viewport">
    <ScrollAreaContent>Scrollable content</ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
  <ScrollAreaCorner />
</ScrollArea>