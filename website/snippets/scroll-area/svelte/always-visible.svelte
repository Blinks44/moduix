<script lang="ts">
  import {
    ScrollArea,
    ScrollAreaContent,
    ScrollAreaCorner,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
  } from '@moduix/svelte/scroll-area';
  import styles from '@/components/examples/scroll-area/scroll-area-always-visible.module.css';

  const items = Array.from({ length: 12 }, (_, index) => `Inbox item ${index + 1}`);
</script>

<ScrollArea variant="always" class={styles.root}>
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
</ScrollArea>