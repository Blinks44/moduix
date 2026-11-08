<script lang="ts">
  import { ProgressCircle, type ProgressCircleProps } from '@ark-ui/svelte/progress';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ProgressCircleProps = $props();
</script>

<ProgressCircle
  {...props}
  bind:ref
  class={cn('block [--size:var(--spacing-control-xl)] [--thickness:0.4rem]', className)}
  data-slot="progress-circular-circle"
/>