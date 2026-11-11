<script lang="ts">
  import {
    PaginationRootProvider,
    type PaginationRootProviderProps,
  } from '@ark-ui/svelte/pagination';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: PaginationRootProviderProps = $props();
</script>

<PaginationRootProvider
  {...props}
  bind:ref
  class={cn('inline-flex max-w-full items-center gap-1 overflow-x-auto text-foreground', className)}
  data-slot="pagination-root-provider"
/>