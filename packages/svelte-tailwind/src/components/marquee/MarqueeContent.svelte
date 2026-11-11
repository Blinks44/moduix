<script lang="ts">
  import { MarqueeContent, type MarqueeContentProps } from '@ark-ui/svelte/marquee';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: MarqueeContentProps = $props();
</script>

<MarqueeContent
  {...props}
  bind:ref
  class={cn(
    'animate-moduix-marquee-x group-data-paused:[animation-play-state:paused] data-reverse:[animation-direction:reverse] data-[orientation=vertical]:animate-moduix-marquee-y motion-reduce:data-[orientation]:animate-none',
    className,
  )}
  data-slot="marquee-content"
/>