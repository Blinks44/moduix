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
  let contentRef: Element | null = $state(null);
  let scrollbarRef: Element | null = $state(null);
  let thumbRef: Element | null = $state(null);
  let cornerRef: Element | null = $state(null);

  export const getRefs = () => ({
    rootRef,
    viewportRef,
    contentRef,
    scrollbarRef,
    thumbRef,
    cornerRef,
  });
</script>

<ScrollArea bind:ref={rootRef}>
  {#snippet asChild(props)}
    <!-- Ark sets role="presentation" on the root; the test needs the region landmark back. -->
    <!-- svelte-ignore a11y_no_redundant_roles -->
    <section {...props()} aria-label="Related articles" role="region">
      <ScrollAreaViewport bind:ref={viewportRef}>
        <ScrollAreaContent bind:ref={contentRef}>Article list</ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar bind:ref={scrollbarRef}>
        <ScrollAreaThumb bind:ref={thumbRef} />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner bind:ref={cornerRef} />
    </section>
  {/snippet}
</ScrollArea>