<script lang="ts">
  import {
    ProgressLinearContext,
    ProgressLinearRange,
    ProgressLinearRootProvider,
    ProgressLinearTrack,
    ProgressLinearView,
    useProgress,
  } from '@/components/progress-linear';
  import ProgressContextValue from './ProgressContextValue.svelte';

  const progress = useProgress({ id: 'provider-progress', defaultValue: 58 });
</script>

<ProgressLinearRootProvider value={progress} data-testid="progress-provider">
  <ProgressLinearTrack aria-label="Team rollout"><ProgressLinearRange /></ProgressLinearTrack>
  <ProgressLinearContext>
    {#snippet render(state)}
      <output>{state().value}</output>
    {/snippet}
  </ProgressLinearContext>
  <ProgressContextValue />
  <ProgressLinearView state="loading">Transfer in progress</ProgressLinearView>
  <ProgressLinearView state="complete">Export complete</ProgressLinearView>
</ProgressLinearRootProvider>