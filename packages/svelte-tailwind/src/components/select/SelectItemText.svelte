<script lang="ts">
  import { SelectItemText, type SelectItemTextProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SelectItemTextProps = $props();
</script>

<SelectItemText
  {...props}
  bind:ref
  class={cn(
    'min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap [&>svg]:me-2 [&>svg]:inline-block [&>svg]:size-4 [&>svg]:align-middle',
    className,
  )}
  data-slot="select-item-text"
/>