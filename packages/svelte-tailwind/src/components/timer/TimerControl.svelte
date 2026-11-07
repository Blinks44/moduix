<script lang="ts">
  import { TimerControl, type TimerControlProps } from '@ark-ui/svelte/timer';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: TimerControlProps = $props();
</script>

<TimerControl
  {...props}
  bind:ref
  class={cn('inline-flex flex-wrap items-center gap-2', className)}
  data-slot="timer-control"
/>