<script lang="ts">
  import { ListboxItemText, type ListboxItemTextProps } from '@ark-ui/svelte/listbox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ListboxItemTextProps = $props();
</script>

<ListboxItemText
  {...props}
  bind:ref
  class={cn(
    'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap [&>svg]:me-2 [&>svg]:inline-block [&>svg]:size-4 [&>svg]:align-middle',
    className,
  )}
  data-slot="listbox-item-text"
/>