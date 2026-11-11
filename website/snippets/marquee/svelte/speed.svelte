<script lang="ts">
  import { Marquee, MarqueeContent, MarqueeItem, MarqueeViewport } from '@moduix/svelte/marquee';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/marquee/marquee-speed.module.css';

  const partners = [
    { name: 'Atlas', mark: 'AT' },
    { name: 'Beacon', mark: 'BC' },
    { name: 'Compass', mark: 'CP' },
    { name: 'Delta', mark: 'DL' },
    { name: 'Echo', mark: 'EC' },
    { name: 'Foundry', mark: 'FD' },
  ];
</script>

<Stack align="center" gap="3">
  <Marquee aria-label="Slow partner logos" speed={25} class={styles.root}>
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
  <Marquee aria-label="Fast partner logos" speed={100} class={styles.root}>
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
</Stack>