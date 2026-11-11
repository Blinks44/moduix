<script lang="ts">
  import { TimerArea, type TimerAreaProps } from '@ark-ui/svelte/timer';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: TimerAreaProps = $props();
</script>

<TimerArea
  {...props}
  bind:ref
  class={cn(
    'inline-flex max-w-full min-w-0 flex-wrap items-baseline justify-center gap-1 text-2xl font-semibold tabular-nums',
    className,
  )}
  data-slot="timer-area"
/>