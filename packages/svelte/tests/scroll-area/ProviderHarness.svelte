<script lang="ts">
  import {
    ScrollAreaContent,
    ScrollAreaContext,
    ScrollAreaCorner,
    ScrollAreaRootProvider,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
    useScrollArea,
  } from '@/components/scroll-area';

  const scrollArea = useScrollArea({ id: 'provider-scroll-area' });
</script>

<ScrollAreaRootProvider
  value={scrollArea}
  data-slot="consumer-provider"
  style="width: 240px; height: 120px"
>
  <ScrollAreaViewport>
    <ScrollAreaContent style="height: 480px">Provider content</ScrollAreaContent>
  </ScrollAreaViewport>
  <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
  <ScrollAreaCorner />
  <ScrollAreaContext>
    {#snippet render(context)}
      <output>{String(context().isAtTop)}</output>
      <button
        type="button"
        onclick={() => context().scrollToEdge({ edge: 'bottom', behavior: 'instant' })}
      >
        Scroll to bottom
      </button>
    {/snippet}
  </ScrollAreaContext>
</ScrollAreaRootProvider>