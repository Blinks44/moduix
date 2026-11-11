<script lang="ts">
  import { ComboboxInput, type ComboboxInputProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ComboboxInputProps = $props();
</script>

<ComboboxInput
  {...props}
  bind:ref
  class={cn(
    'min-w-0 flex-1 bg-transparent text-sm leading-5 outline-0 placeholder:text-muted-foreground',
    className,
  )}
  data-slot="command-palette-input"
/>