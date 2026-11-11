<script lang="ts">
  import { ComboboxItemGroup, type ComboboxItemGroupProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ComboboxItemGroupProps = $props();
</script>

<ComboboxItemGroup
  {...props}
  bind:ref
  class={cn('flex flex-col [&+&]:mt-2', className)}
  data-slot="combobox-item-group"
/>