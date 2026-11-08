<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearContext,
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearTrack,
    ProgressLinearValueText,
  } from '@moduix/svelte/progress-linear';

  const translations = {
    value: ({ value, max }: { value: number | null; max: number }) =>
      value === null ? 'Loading...' : `${value} of ${max} items loaded`,
  };
</script>

<ProgressLinear {translations}>
  <ProgressLinearLabel>Migration</ProgressLinearLabel>
  <ProgressLinearContext>
    {#snippet render(state)}
      <ProgressLinearValueText>{state().valueAsString}</ProgressLinearValueText>
    {/snippet}
  </ProgressLinearContext>
  <ProgressLinearTrack aria-label="Migration">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinear>