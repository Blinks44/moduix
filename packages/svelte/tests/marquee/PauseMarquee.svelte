<script lang="ts">
  import {
    Marquee,
    MarqueeContent,
    MarqueeItem,
    MarqueeViewport,
    type MarqueePauseStatusDetails,
  } from '@/components/marquee';

  let paused = $state(false);
  const pauseChanges = $state<MarqueePauseStatusDetails[]>([]);

  export const getState = () => ({ pauseChanges, paused });
</script>

<Marquee
  bind:paused
  aria-label="Partner logos"
  pauseOnInteraction
  onPauseChange={(details) => pauseChanges.push(details)}
>
  <MarqueeViewport>
    <MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent>
  </MarqueeViewport>
</Marquee>