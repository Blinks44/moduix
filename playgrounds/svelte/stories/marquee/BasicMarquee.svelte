<script lang="ts">
  import {
    Marquee,
    MarqueeContent,
    MarqueeViewport,
    type MarqueeRootProps,
  } from '@/components/marquee';
  import styles from './Marquee.stories.module.css';
  import MarqueeItems from './MarqueeItems.svelte';

  let { class: className, ...props }: MarqueeRootProps = $props();
</script>

<Marquee aria-label="Partner logos" {...props} class={[styles.root, className]}>
  <MarqueeViewport>
    <MarqueeContent><MarqueeItems /></MarqueeContent>
  </MarqueeViewport>
</Marquee>