<script lang="ts">
  import { ComboboxLabel, type ComboboxLabelProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ComboboxLabelProps = $props();
</script>

<ComboboxLabel
  {...props}
  bind:ref
  class={cn(
    'inline-flex items-center text-sm font-medium text-foreground select-none data-disabled:opacity-disabled',
    className,
  )}
  data-slot="combobox-label"
/>