<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearTrack,
    ProgressLinearValueText,
  } from '@moduix/svelte/progress-linear';
</script>

<ProgressLinear defaultValue={24}>
  <ProgressLinearLabel>Export data</ProgressLinearLabel>
  <ProgressLinearValueText />
  <ProgressLinearTrack aria-label="Export data">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinear>