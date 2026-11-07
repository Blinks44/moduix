<script lang="ts">
  import {
    CarouselIndicatorGroup,
    type CarouselIndicatorGroupProps,
  } from '@ark-ui/svelte/carousel';
  import { cn } from '@/lib/moduix/cn';
  const indicatorGroupClass =
    'flex items-center justify-center gap-2 data-[orientation=vertical]:flex-col';

  let { class: className, ref = $bindable(null), ...props }: CarouselIndicatorGroupProps = $props();
</script>

<CarouselIndicatorGroup
  {...props}
  bind:ref
  class={cn(indicatorGroupClass, className)}
  data-slot="carousel-indicator-group"
/>