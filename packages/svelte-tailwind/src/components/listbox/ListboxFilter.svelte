<script module lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  export interface ListboxFilterProps extends HTMLAttributes<HTMLDivElement> {
    ref?: HTMLDivElement | null;
  }
</script>

<script lang="ts">
  import { cn } from '@/lib/moduix/cn';
  import { SearchIcon } from '@/lib/moduix/icons/ui';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: ListboxFilterProps = $props();
</script>

<div
  {...props}
  bind:this={ref}
  class={cn('group/listbox-filter peer/listbox-filter relative w-full', className)}
  data-slot="listbox-filter"
>
  <SearchIcon
    data-slot="listbox-filter-icon"
    class="pointer-events-none absolute start-3 top-1/2 z-1 size-4 -translate-y-1/2 text-muted-foreground"
  />
  {@render children?.()}
</div>