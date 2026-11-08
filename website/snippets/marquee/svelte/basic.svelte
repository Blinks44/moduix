<script lang="ts">
  import { Marquee, MarqueeContent, MarqueeItem, MarqueeViewport } from '@moduix/svelte/marquee';
  import styles from '@/components/examples/marquee/marquee-basic.module.css';

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
</Marquee>