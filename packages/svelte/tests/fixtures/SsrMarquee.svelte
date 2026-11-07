<script lang="ts">
  import {
    Marquee,
    MarqueeContent,
    MarqueeContext,
    MarqueeItem,
    MarqueeViewport,
  } from '@/components/marquee';
</script>

<Marquee aria-label="Partner logos">
  <MarqueeViewport>
    <MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent>
  </MarqueeViewport>
  <MarqueeContext>
    {#snippet render(context)}
      <button type="button" onclick={() => context().pause()}>Pause marquee</button>
    {/snippet}
  </MarqueeContext>
</Marquee>