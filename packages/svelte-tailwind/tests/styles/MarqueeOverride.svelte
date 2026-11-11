<script lang="ts">
  import {
    Marquee,
    MarqueeContent,
    MarqueeEdge,
    MarqueeItem,
    MarqueeViewport,
    type MarqueeSide,
  } from '@/components/marquee';

  let { mode }: { mode: 'horizontal' | 'vertical' } = $props();

  const side: MarqueeSide = 'bottom';
</script>

{#if mode === 'horizontal'}
  <Marquee aria-label="Partner logos" class="w-1/2 text-primary">
    <MarqueeViewport>
      <MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent>
    </MarqueeViewport>
    <MarqueeEdge side="start" class="w-1/4" data-testid="edge" />
  </Marquee>
{:else}
  <Marquee {side} class="h-96">
    <MarqueeViewport>
      <MarqueeContent><MarqueeItem>Atlas</MarqueeItem></MarqueeContent>
    </MarqueeViewport>
  </Marquee>
{/if}