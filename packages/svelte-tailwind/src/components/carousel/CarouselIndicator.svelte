<script lang="ts">
  import { CarouselIndicator, type CarouselIndicatorProps } from '@ark-ui/svelte/carousel';
  import { cn } from '@/lib/moduix/cn';
  const indicatorClass =
    'size-2 cursor-pointer rounded-full border-0 bg-muted-foreground/50 p-0 transition-[width,height,background-color] duration-fast focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-disabled data-current:w-6 data-current:bg-primary data-disabled:cursor-not-allowed data-disabled:opacity-disabled data-readonly:cursor-not-allowed data-readonly:opacity-disabled data-[orientation=vertical]:data-current:h-6 data-[orientation=vertical]:data-current:w-2 forced-colors:bg-[ButtonText] forced-colors:data-current:bg-[Highlight] [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):not([data-readonly]):not([data-current]):hover]:bg-muted-foreground';

  let { class: className, ref = $bindable(null), ...props }: CarouselIndicatorProps = $props();
</script>

<CarouselIndicator
  {...props}
  bind:ref
  class={cn(indicatorClass, className)}
  data-slot="carousel-indicator"
/>