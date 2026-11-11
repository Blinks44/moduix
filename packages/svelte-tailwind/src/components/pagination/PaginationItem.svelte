<script lang="ts">
  import { PaginationItem, type PaginationItemProps } from '@ark-ui/svelte/pagination';
  import { cn } from '@/lib/moduix/cn';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: PaginationItemProps = $props();
</script>

<PaginationItem
  {...props}
  bind:ref
  {asChild}
  class={cn(
    'inline-flex h-control-md min-w-control-md items-center justify-center rounded-md text-sm font-medium tabular-nums',
    'cursor-pointer gap-2 border border-border bg-background px-2 whitespace-nowrap text-foreground no-underline select-none',
    'focus-visible:outline-focus focus-visible:outline-offset-focus-inset focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:opacity-disabled',
    'data-selected:border-foreground data-selected:bg-foreground data-selected:text-background [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:data-selected:hover:bg-foreground',
    '[&_svg]:size-4 [&_svg]:shrink-0',
    className,
  )}
  data-slot="pagination-item"
/>