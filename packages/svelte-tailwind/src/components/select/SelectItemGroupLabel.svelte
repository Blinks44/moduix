<script lang="ts">
  import { SelectItemGroupLabel, type SelectItemGroupLabelProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SelectItemGroupLabelProps = $props();
</script>

<SelectItemGroupLabel
  {...props}
  bind:ref
  class={cn('px-2.5 py-1 text-xs font-normal text-muted-foreground', className)}
  data-slot="select-item-group-label"
/>