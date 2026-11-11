<script lang="ts">
  import { SelectItemGroup, type SelectItemGroupProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SelectItemGroupProps = $props();
</script>

<SelectItemGroup
  {...props}
  bind:ref
  class={cn('flex flex-col [&+&]:mt-2', className)}
  data-slot="select-item-group"
/>