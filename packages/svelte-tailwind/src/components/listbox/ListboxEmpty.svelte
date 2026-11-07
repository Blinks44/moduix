<script lang="ts">
  import { ListboxEmpty, type ListboxEmptyProps } from '@ark-ui/svelte/listbox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ListboxEmptyProps = $props();
</script>

<ListboxEmpty
  {...props}
  bind:ref
  class={cn('px-3 py-1 text-center text-sm leading-5 text-muted-foreground', className)}
  data-slot="listbox-empty"
/>