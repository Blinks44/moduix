<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearTrack,
    ProgressLinearValueText,
  } from '@moduix/svelte/progress-linear';
</script>

<ProgressLinear defaultValue={420} min={200} max={800}>
  <ProgressLinearLabel>Requests per minute</ProgressLinearLabel>
  <ProgressLinearValueText />
  <ProgressLinearTrack aria-label="Requests per minute">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinear>