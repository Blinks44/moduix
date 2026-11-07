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
    'sticky -top-1 z-1 bg-popover px-2.5 py-1 text-xs font-normal text-muted-foreground',
    className,
  )}
  data-slot="combobox-item-group-label"
/>