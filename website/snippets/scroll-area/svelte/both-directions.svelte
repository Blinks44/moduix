<script lang="ts">
  import {
    ScrollArea,
    ScrollAreaContent,
    ScrollAreaCorner,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
  } from '@moduix/svelte/scroll-area';
  import styles from '@/components/examples/scroll-area/scroll-area-both-directions.module.css';

  const cells = Array.from({ length: 96 }, (_, index) => index + 1);
</script>

<ScrollArea class={styles.root}>
  <ScrollAreaViewport>
    <ScrollAreaContent>
      <div class={styles.content}>
        {#each cells as cell (cell)}
          <div class={styles.cell}>{cell}</div>
        {/each}
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