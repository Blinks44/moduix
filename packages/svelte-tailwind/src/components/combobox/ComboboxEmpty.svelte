<script lang="ts">
  import { ComboboxEmpty, type ComboboxEmptyProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ComboboxEmptyProps = $props();
</script>

<ComboboxEmpty
  {...props}
  bind:ref
  class={cn('px-4 py-1 text-sm text-muted-foreground', className)}
  data-slot="combobox-empty"
/>