<script lang="ts">
  import { ProgressRootProvider, type ProgressRootProviderProps } from '@ark-ui/svelte/progress';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ProgressRootProviderProps = $props();
</script>

<ProgressRootProvider
  {...props}
  bind:ref
  class={cn(
    'grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)]',
    className,
  )}
  data-slot="progress-linear-root-provider"
/>