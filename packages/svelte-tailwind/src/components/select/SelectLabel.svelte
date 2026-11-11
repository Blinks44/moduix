<script lang="ts">
  import { SelectLabel, type SelectLabelProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SelectLabelProps = $props();
</script>

<SelectLabel
  {...props}
  bind:ref
  class={cn(
    'inline-flex items-center text-sm font-medium text-foreground select-none data-disabled:opacity-disabled',
    className,
  )}
  data-slot="select-label"
/>