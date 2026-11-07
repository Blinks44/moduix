<script lang="ts">
  import {
    TimerActionTrigger,
    TimerContext,
    TimerControl,
    TimerRootProvider,
    useTimer,
  } from '@/components/timer';
  import ProviderStatus from './ProviderStatus.svelte';

  const timer = useTimer({ id: 'provider-timer', targetMs: 60_000 });
</script>

<TimerRootProvider value={timer}>
  <ProviderStatus />
  <TimerContext>
    {#snippet render(context)}
      <output data-testid="timer-context">{context().running ? 'Running' : 'Idle'}</output>
    {/snippet}
  </TimerContext>
  <TimerControl>
    <TimerActionTrigger action="start">Start provider timer</TimerActionTrigger>
  </TimerControl>
</TimerRootProvider>