<script lang="ts">
  import { CarouselNextTrigger, type CarouselNextTriggerProps } from '@ark-ui/svelte/carousel';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

  const triggerClass =
    'group/carousel-trigger inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm outline-0 transition-[background-color,color] duration-fast ease-in-out focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-disabled data-disabled:cursor-not-allowed data-disabled:opacity-disabled data-pressed:bg-accent data-pressed:text-accent-foreground [&_svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-accent-foreground';
  const iconClass =
    'group-data-[orientation=vertical]/carousel-trigger:rotate-90 group-data-[orientation=horizontal]/carousel-trigger:rtl:rotate-180';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: CarouselNextTriggerProps = $props();
</script>

<CarouselNextTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(triggerClass, 'size-control-md', className)}
  data-slot="carousel-next-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <ChevronRightIcon class={iconClass} />
  {/if}
</CarouselNextTrigger>