<script lang="ts">
  import { SelectList, type SelectListProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SelectListProps = $props();
</script>

<SelectList
  {...props}
  bind:ref
  class={cn(
    'flex min-h-0 scroll-py-1 flex-col overflow-y-auto overscroll-contain outline-0',
    className,
  )}
  data-slot="select-list"
/>