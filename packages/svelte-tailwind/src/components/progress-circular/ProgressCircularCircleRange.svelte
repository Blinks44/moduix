<script lang="ts">
  import { ProgressCircleRange, type ProgressCircleRangeProps } from '@ark-ui/svelte/progress';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ProgressCircleRangeProps = $props();
</script>

<ProgressCircleRange
  {...props}
  bind:ref
  class={cn(
    'stroke-primary transition-[stroke-dashoffset] duration-normal ease-in-out [stroke-linecap:round] data-[state=indeterminate]:animate-moduix-progress-circular-indeterminate data-[state=indeterminate]:[stroke-dasharray:calc(var(--circumference)/4)_var(--circumference)] motion-reduce:data-[state=indeterminate]:animate-none',
    className,
  )}
  data-slot="progress-circular-circle-range"
/>