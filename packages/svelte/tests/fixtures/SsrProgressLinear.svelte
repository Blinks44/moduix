<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearTrack,
    ProgressLinearValueText,
  } from '@/components/progress-linear';
</script>

<ProgressLinear defaultValue={42}>
  <ProgressLinearLabel>Export data</ProgressLinearLabel>
  <ProgressLinearValueText />
  <ProgressLinearTrack aria-label="Export data"><ProgressLinearRange /></ProgressLinearTrack>
</ProgressLinear>