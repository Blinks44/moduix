<script lang="ts">
  import { SelectControl, type SelectControlProps } from '@ark-ui/svelte/select';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SelectControlProps = $props();
</script>

<SelectControl
  {...props}
  bind:ref
  class={cn(
    'group/select-control relative flex w-full min-w-0 items-center data-disabled:opacity-disabled',
    className,
  )}
  data-slot="select-control"
/>