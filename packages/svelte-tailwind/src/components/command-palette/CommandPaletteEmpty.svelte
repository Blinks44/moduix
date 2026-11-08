<script lang="ts">
  import { ComboboxEmpty, type ComboboxEmptyProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: ComboboxEmptyProps = $props();
</script>

<ComboboxEmpty
  {...props}
  bind:ref
  class={cn('px-1 text-sm leading-5 text-muted-foreground', className)}
  data-slot="command-palette-empty"
/>