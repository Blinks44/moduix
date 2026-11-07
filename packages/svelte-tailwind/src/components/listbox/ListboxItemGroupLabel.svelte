<script lang="ts">
  import { ListboxItemGroupLabel, type ListboxItemGroupLabelProps } from '@ark-ui/svelte/listbox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ListboxItemGroupLabelProps = $props();
</script>

<ListboxItemGroupLabel
  {...props}
  bind:ref
  class={cn('px-2 py-1 text-xs leading-4 font-normal text-muted-foreground select-none', className)}
  data-slot="listbox-item-group-label"
/>