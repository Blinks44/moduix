<script lang="ts">
  import {
    Marquee,
    MarqueeContent,
    MarqueeEdge,
    MarqueeItem,
    MarqueeViewport,
  } from '@moduix/svelte/marquee';
  import styles from '@/components/examples/marquee/marquee-edges.module.css';

  const partners = [
    { name: 'Atlas', mark: 'AT' },
    { name: 'Beacon', mark: 'BC' },
    { name: 'Compass', mark: 'CP' },
    { name: 'Delta', mark: 'DL' },
    { name: 'Echo', mark: 'EC' },
    { name: 'Foundry', mark: 'FD' },
  ];
</script>

<Marquee aria-label="Partner logos" class={styles.root}>
  <MarqueeEdge side="start" />
  <MarqueeViewport>
    <MarqueeContent>
      {#each partners as item (item.name)}
        <MarqueeItem class={styles.item}>
          <span>{item.mark}</span>
          <span>{item.name}</span>
        </MarqueeItem>
      {/each}
    </MarqueeContent>
  </MarqueeViewport>
  <MarqueeEdge side="end" />
</Marquee>