<script lang="ts">
  import { ComboboxItemGroup, type ComboboxItemGroupProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ComboboxItemGroupProps = $props();
</script>

<ComboboxItemGroup
  {...props}
  bind:ref
  class={cn('grid gap-1 [&:not(:last-child)]:pb-2', className)}
  data-slot="command-palette-item-group"
/>