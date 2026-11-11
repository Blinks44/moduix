<script lang="ts">
  import { TimerSeparator, type TimerSeparatorProps } from '@ark-ui/svelte/timer';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: TimerSeparatorProps = $props();
</script>

<TimerSeparator
  {...props}
  bind:ref
  class={cn('text-muted-foreground', className)}
  data-slot="timer-separator"
/>