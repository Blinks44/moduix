<script lang="ts">
  import {
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearRootProvider,
    ProgressLinearTrack,
    ProgressLinearValueText,
    useProgress,
  } from '@moduix/svelte/progress-linear';

  const id = $props.id();
  const progress = useProgress({ id, defaultValue: 58 });
</script>

<ProgressLinearRootProvider value={progress}>
  <ProgressLinearLabel>Team rollout</ProgressLinearLabel>
  <ProgressLinearValueText />
  <ProgressLinearTrack aria-label="Team rollout">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinearRootProvider>