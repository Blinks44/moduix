<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import type { CollectionItem } from '@ark-ui/svelte/collection';
  import { SelectItem, type SelectItemProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SelectItemProps<T> = $props();
</script>

<SelectItem
  {...props}
  bind:ref
  class={cn(
    'relative mx-1 flex min-h-control-sm cursor-default items-center justify-between gap-2 rounded-sm px-3 py-1 text-sm outline-0 select-none data-disabled:pointer-events-none data-disabled:opacity-disabled data-highlighted:bg-accent data-highlighted:text-accent-foreground',
    className,
  )}
  data-slot="select-item"
/>