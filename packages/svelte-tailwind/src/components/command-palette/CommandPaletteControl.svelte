<script lang="ts">
  import { ComboboxControl, type ComboboxControlProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ComboboxControlProps = $props();
</script>

<ComboboxControl
  {...props}
  bind:ref
  class={cn(
    'mx-3 mt-3 flex min-h-control-md flex-none items-center gap-2 rounded-md border border-input bg-background px-3 py-1 text-foreground transition-[border-color] duration-normal ease-in-out data-invalid:border-destructive',
    className,
  )}
  data-slot="command-palette-control"
/>