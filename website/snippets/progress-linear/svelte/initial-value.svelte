<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearTrack,
    ProgressLinearValueText,
  } from '@moduix/svelte/progress-linear';
</script>

<ProgressLinear defaultValue={70}>
  <ProgressLinearLabel>Import data</ProgressLinearLabel>
  <ProgressLinearValueText />
  <ProgressLinearTrack aria-label="Import data">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinear>