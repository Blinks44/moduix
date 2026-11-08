<script lang="ts">
  import { Marquee, MarqueeContent, MarqueeItem, MarqueeViewport } from '@moduix/svelte/marquee';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/marquee/marquee-finite-loops.module.css';

  const partners = [
    { name: 'Atlas', mark: 'AT' },
    { name: 'Beacon', mark: 'BC' },
    { name: 'Compass', mark: 'CP' },
    { name: 'Delta', mark: 'DL' },
    { name: 'Echo', mark: 'EC' },
    { name: 'Foundry', mark: 'FD' },
  ];

  let loops = $state(0);
  let completed = $state(0);
  const handleLoopComplete = () => loops++;
  const handleComplete = () => completed++;
</script>

<Stack align="center" gap="3">
  <Marquee
    aria-label="Partner logos"
    loopCount={3}
    class={styles.root}
    onLoopComplete={handleLoopComplete}
    onComplete={handleComplete}
  >
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
  <div class={styles.status}>
    <span>Loops: {loops}</span>
    <span>Completed: {completed}</span>
  </div>
</Stack>