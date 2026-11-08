<script lang="ts">
  import { ProgressRoot, type ProgressRootProps } from '@ark-ui/svelte/progress';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: ProgressRootProps = $props();
</script>

<ProgressRoot
  {...props}
  bind:ref
  bind:value
  class={cn(
    'grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)]',
    className,
  )}
  data-slot="progress-linear-root"
/>