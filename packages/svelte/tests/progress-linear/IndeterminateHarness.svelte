<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearRange,
    ProgressLinearTrack,
  } from '@/components/progress-linear';
</script>

<ProgressLinear value={null}>
  <ProgressLinearTrack aria-label="Preparing report">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinear>