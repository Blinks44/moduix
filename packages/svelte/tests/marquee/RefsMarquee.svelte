<script lang="ts">
  import { Marquee, MarqueeContent, MarqueeItem, MarqueeViewport } from '@/components/marquee';

  let rootRef = $state<HTMLElement | null>(null);
  let itemRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ itemRef, rootRef });
</script>

<Marquee bind:ref={rootRef} aria-label="Partner logos">
  <MarqueeViewport>
    <MarqueeContent>
      <MarqueeItem bind:ref={itemRef}>Atlas</MarqueeItem>
    </MarqueeContent>
  </MarqueeViewport>
</Marquee>