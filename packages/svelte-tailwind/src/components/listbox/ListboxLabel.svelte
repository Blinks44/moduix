<script lang="ts">
  import { ListboxLabel, type ListboxLabelProps } from '@ark-ui/svelte/listbox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ListboxLabelProps = $props();
</script>

<ListboxLabel
  {...props}
  bind:ref
  class={cn('text-sm leading-5 font-medium select-none', className)}
  data-slot="listbox-label"
/>