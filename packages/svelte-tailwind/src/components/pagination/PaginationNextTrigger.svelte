<script lang="ts">
  import {
    PaginationNextTrigger,
    type PaginationNextTriggerProps,
  } from '@ark-ui/svelte/pagination';
  import { cn } from '@/lib/moduix/cn';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: PaginationNextTriggerProps = $props();
</script>

<PaginationNextTrigger
  {...props}
  bind:ref
  {asChild}
  class={cn(
    'inline-flex h-control-md min-w-control-md items-center justify-center rounded-md text-sm font-medium tabular-nums',
    'cursor-pointer gap-2 border border-border bg-background px-3 whitespace-nowrap text-foreground no-underline select-none',
    'focus-visible:outline-focus focus-visible:outline-offset-focus-inset focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:opacity-disabled',
    '[&_svg]:size-4 [&_svg]:shrink-0 [@media(hover:hover)]:hover:bg-accent',
    !children && !asChild && 'px-0 [&:dir(rtl)]:[&_svg]:-scale-x-100',
    className,
  )}
  data-slot="pagination-next-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <ChevronRightIcon />
  {/if}
</PaginationNextTrigger>