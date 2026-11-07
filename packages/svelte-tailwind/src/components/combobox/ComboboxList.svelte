<script lang="ts">
  import { ComboboxList, type ComboboxListProps } from '@ark-ui/svelte/combobox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ComboboxListProps = $props();
</script>

<ComboboxList
  {...props}
  bind:ref
  class={cn('flex min-h-0 flex-col outline-0 data-empty:hidden', className)}
  data-slot="combobox-list"
/>