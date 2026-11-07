<script lang="ts">
  import { PaginationRoot, type PaginationRootProps } from '@ark-ui/svelte/pagination';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    page = $bindable(),
    pageSize = $bindable(),
    ref = $bindable(null),
    ...props
  }: PaginationRootProps = $props();
</script>

<PaginationRoot
  {...props}
  bind:ref
  bind:page
  bind:pageSize
  class={cn('inline-flex max-w-full items-center gap-1 overflow-x-auto text-foreground', className)}
  data-slot="pagination-root"
/>