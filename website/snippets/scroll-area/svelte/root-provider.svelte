<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    ScrollAreaContent,
    ScrollAreaCorner,
    ScrollAreaRootProvider,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
    useScrollArea,
  } from '@moduix/svelte/scroll-area';
  import styles from '@/components/examples/scroll-area/scroll-area-root-provider.module.css';

  const items = Array.from({ length: 12 }, (_, index) => `Activity item ${index + 1}`);
  const id = $props.id();
  const scrollArea = useScrollArea({ id });
  let edge = $state('top');

  const scrollToEdge = (nextEdge: 'top' | 'bottom') => {
    scrollArea().scrollToEdge({ edge: nextEdge });
    edge = nextEdge;
  };
</script>

<div class={styles.root}>
  <ScrollAreaRootProvider class={styles.scrollArea} value={scrollArea}>
    <ScrollAreaViewport>
      <ScrollAreaContent>
        <div class={styles.content}>
          {#each items as item (item)}
            <div class={styles.item}>{item}</div>
          {/each}
        </div>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar>
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaRootProvider>
  <div data-preview-meta>
    <output>Current edge: {edge}</output>
    <Button type="button" size="sm" variant="outline" onclick={() => scrollToEdge('top')}
      >Top</Button
    >
    <Button type="button" size="sm" variant="outline" onclick={() => scrollToEdge('bottom')}>
      Bottom
    </Button>
  </div>
</div>