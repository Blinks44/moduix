<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearTrack,
    ProgressLinearValueText,
  } from '@moduix/svelte/progress-linear';
</script>

<ProgressLinear defaultValue={null}>
  <ProgressLinearLabel>Preparing report</ProgressLinearLabel>
  <ProgressLinearValueText />
  <ProgressLinearTrack aria-label="Preparing report">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinear>