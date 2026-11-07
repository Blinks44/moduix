<script lang="ts">
  import {
    CarouselAutoplayIndicator,
    type CarouselAutoplayIndicatorProps,
  } from '@ark-ui/svelte/carousel';
  import { cn } from '@/lib/moduix/cn';
  const autoplayIndicatorClass = 'text-xs font-medium';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: CarouselAutoplayIndicatorProps = $props();
</script>

<CarouselAutoplayIndicator
  {...props}
  bind:ref
  class={cn(autoplayIndicatorClass, className)}
  data-slot="carousel-autoplay-indicator"
/>