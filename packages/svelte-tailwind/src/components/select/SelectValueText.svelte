<script lang="ts">
  import { SelectValueText, type SelectValueTextProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SelectValueTextProps = $props();
</script>

<SelectValueText
  {...props}
  bind:ref
  class={cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', className)}
  data-slot="select-value-text"
/>