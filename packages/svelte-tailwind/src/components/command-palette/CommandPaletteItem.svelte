<script lang="ts">
  import { ComboboxItem, type ComboboxItemProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ComboboxItemProps = $props();
</script>

<ComboboxItem
  {...props}
  bind:ref
  class={cn(
    'flex min-h-control-sm cursor-default items-center gap-3 rounded-md px-3 py-1 text-sm leading-5 outline-0 select-none data-disabled:pointer-events-none data-disabled:opacity-disabled data-highlighted:bg-accent data-highlighted:text-accent-foreground',
    className,
  )}
  data-slot="command-palette-item"
/>