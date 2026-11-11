<script lang="ts">
  import {
    ProgressCircularContext,
    ProgressCircularRing,
    ProgressCircularRootProvider,
    useProgress,
  } from '@/components/progress-circular';
  import ProgressContextValue from './ProgressContextValue.svelte';

  const progress = useProgress({ id: 'provider-progress', defaultValue: 58 });
</script>

<ProgressCircularRootProvider value={progress} data-testid="progress-provider">
  <ProgressCircularRing aria-label="Team rollout" />
  <ProgressCircularContext>
    {#snippet render(state)}
      <output>{state().value}</output>
    {/snippet}
  </ProgressCircularContext>
  <ProgressContextValue />
</ProgressCircularRootProvider>