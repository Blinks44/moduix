<script lang="ts">
  import {
    ScrollArea,
    ScrollAreaContent,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
  } from '@/components/scroll-area';
</script>

<ScrollArea variant="always" style="width: 200px; height: 100px">
  <ScrollAreaViewport>
    <ScrollAreaContent style="height: 400px">Tall content</ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar data-testid="vertical">
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
  <ScrollAreaScrollbar data-testid="horizontal" orientation="horizontal">
    <ScrollAreaThumb />
  </ScrollAreaScrollbar>
</ScrollArea>