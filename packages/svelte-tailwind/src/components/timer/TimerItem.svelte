<script lang="ts">
  import { TimerItem, type TimerItemProps } from '@ark-ui/svelte/timer';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: TimerItemProps = $props();
</script>

<TimerItem
  {...props}
  bind:ref
  class={cn('min-w-[2ch] text-center', className)}
  data-slot="timer-item"
/>