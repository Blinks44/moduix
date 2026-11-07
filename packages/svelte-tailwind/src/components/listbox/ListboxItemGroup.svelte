<script lang="ts">
  import { ListboxItemGroup, type ListboxItemGroupProps } from '@ark-ui/svelte/listbox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ListboxItemGroupProps = $props();
</script>

<ListboxItemGroup
  {...props}
  bind:ref
  class={cn('flex flex-col [&+&]:mt-2', className)}
  data-slot="listbox-item-group"
/>