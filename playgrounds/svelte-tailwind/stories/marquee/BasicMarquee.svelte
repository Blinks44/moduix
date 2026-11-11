<script lang="ts">
  import {
    Marquee,
    MarqueeContent,
    MarqueeViewport,
    type MarqueeRootProps,
  } from '@/components/marquee';
  import { cn } from '@/lib/moduix/cn';
  import MarqueeItems from './MarqueeItems.svelte';

  const rootClass = 'w-[32rem] max-w-[calc(100vw-2rem)]';

  let { class: className, ...props }: MarqueeRootProps = $props();
</script>

<Marquee aria-label="Partner logos" {...props} class={cn(rootClass, className)}>
  <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
</Marquee>