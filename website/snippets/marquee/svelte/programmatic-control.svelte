<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    MarqueeContent,
    MarqueeItem,
    MarqueeRootProvider,
    MarqueeViewport,
    useMarquee,
  } from '@moduix/svelte/marquee';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/marquee/marquee-programmatic-control.module.css';

  const partners = [
    { name: 'Atlas', mark: 'AT' },
    { name: 'Beacon', mark: 'BC' },
    { name: 'Compass', mark: 'CP' },
    { name: 'Delta', mark: 'DL' },
    { name: 'Echo', mark: 'EC' },
    { name: 'Foundry', mark: 'FD' },
  ];

  const id = $props.id();
  const marquee = useMarquee({ id, translations: { root: 'Partner logos' } });
  let status = $state('Running');

  const handlePause = () => {
    marquee().pause();
    status = 'Paused';
  };

  const handleResume = () => {
    marquee().resume();
    status = 'Running';
  };

  const handleRestart = () => {
    marquee().restart();
    status = 'Restarted';
  };
</script>

<Stack align="center" gap="3">
  <MarqueeRootProvider value={marquee} class={styles.root}>
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
  </MarqueeRootProvider>
  <div data-preview-meta>
    <output>Playback: {status}</output>
    <Button size="sm" variant="outline" onclick={handlePause}>Pause</Button>
    <Button size="sm" variant="outline" onclick={handleResume}>Resume</Button>
    <Button size="sm" variant="outline" onclick={handleRestart}>Restart</Button>
  </div>
</Stack>