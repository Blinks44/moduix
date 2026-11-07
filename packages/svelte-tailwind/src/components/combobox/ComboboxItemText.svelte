<script lang="ts">
  import { ComboboxItemText, type ComboboxItemTextProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ComboboxItemTextProps = $props();
</script>

<ComboboxItemText
  {...props}
  bind:ref
  class={cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', className)}
  data-slot="combobox-item-text"
/>