<script lang="ts">
  import {
    ComboboxItemGroupLabel,
    type ComboboxItemGroupLabelProps,
  } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ComboboxItemGroupLabelProps = $props();
</script>

<ComboboxItemGroupLabel
  {...props}
  bind:ref
  class={cn(
    'sticky top-0 z-1 bg-popover px-3 py-1 text-xs leading-4 font-normal text-muted-foreground',
    className,
  )}
  data-slot="command-palette-item-group-label"
/>