<script lang="ts">
  import {
    MarqueeContent,
    MarqueeItem,
    MarqueeRootProvider,
    MarqueeViewport,
    useMarquee,
    type MarqueePauseStatusDetails,
  } from '@/components/marquee';
  import ContextPauseControl from './ContextPauseControl.svelte';

  let { onPauseChange }: { onPauseChange?: (details: MarqueePauseStatusDetails) => void } =
    $props();

  const marquee = useMarquee({
    id: 'provider-marquee',
    translations: { root: 'Partner logos' },
    onPauseChange: (details) => onPauseChange?.(details),
  });
</script>

<MarqueeRootProvider value={marquee}>
  <MarqueeViewport>
    <MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent>
  </MarqueeViewport>
  <ContextPauseControl />
</MarqueeRootProvider>