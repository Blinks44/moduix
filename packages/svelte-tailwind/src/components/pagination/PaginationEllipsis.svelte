<script lang="ts">
  import { PaginationEllipsis, type PaginationEllipsisProps } from '@ark-ui/svelte/pagination';
  import { cn } from '@/lib/moduix/cn';
  import { EllipsisIcon } from '@/lib/moduix/icons/ui';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: PaginationEllipsisProps = $props();
</script>

<PaginationEllipsis
  aria-hidden="true"
  {...props}
  bind:ref
  {asChild}
  class={cn(
    'inline-flex h-control-md min-w-control-md items-center justify-center rounded-md text-sm font-medium text-muted-foreground tabular-nums select-none [&_svg]:size-4 [&_svg]:shrink-0',
    className,
  )}
  data-slot="pagination-ellipsis"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <EllipsisIcon />
  {/if}
</PaginationEllipsis>