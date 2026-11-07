<script lang="ts">
  import {
    CarouselAutoplayTrigger,
    type CarouselAutoplayTriggerProps,
  } from '@ark-ui/svelte/carousel';
  import { cn } from '@/lib/moduix/cn';
  const triggerClass =
    'group/carousel-trigger inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,color] duration-fast ease-in-out focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-disabled data-disabled:cursor-not-allowed data-disabled:opacity-disabled data-pressed:bg-accent data-pressed:text-accent-foreground [&_svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: CarouselAutoplayTriggerProps = $props();
</script>

<CarouselAutoplayTrigger
  {...props}
  bind:ref
  class={cn(triggerClass, 'h-control-md min-w-control-md px-2', className)}
  data-slot="carousel-autoplay-trigger"
/>