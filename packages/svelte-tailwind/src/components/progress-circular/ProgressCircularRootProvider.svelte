<script lang="ts">
  import { ProgressRootProvider, type ProgressRootProviderProps } from '@ark-ui/svelte/progress';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ProgressRootProviderProps = $props();
</script>

<ProgressRootProvider
  {...props}
  bind:ref
  class={cn('inline-grid w-max max-w-full justify-items-center gap-2', className)}
  data-slot="progress-circular-root-provider"
/>