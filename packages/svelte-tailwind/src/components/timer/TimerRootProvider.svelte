<script lang="ts">
  import { TimerRootProvider, type TimerRootProviderProps } from '@ark-ui/svelte/timer';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: TimerRootProviderProps = $props();
</script>

<TimerRootProvider
  {...props}
  bind:ref
  class={cn('inline-grid w-max max-w-full place-items-center gap-3 text-foreground', className)}
  data-slot="timer-root-provider"
/>