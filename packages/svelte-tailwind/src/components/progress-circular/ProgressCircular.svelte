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
  class={cn('inline-grid w-max max-w-full justify-items-center gap-2', className)}
  data-slot="progress-circular-root"
/>