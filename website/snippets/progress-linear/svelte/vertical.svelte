<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearTrack,
    ProgressLinearValueText,
  } from '@moduix/svelte/progress-linear';
</script>

<ProgressLinear defaultValue={42} orientation="vertical">
  <ProgressLinearLabel>Indexing files</ProgressLinearLabel>
  <ProgressLinearValueText />
  <ProgressLinearTrack aria-label="Indexing files">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinear>