<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearTrack,
    ProgressLinearValueText,
  } from '@/components/progress-linear';
</script>

<ProgressLinear class="w-80" data-testid="progress-root">
  <ProgressLinearLabel>Export data</ProgressLinearLabel>
  <ProgressLinearValueText />
  <ProgressLinearTrack class="h-4" aria-label="Export data">
    <ProgressLinearRange class="bg-accent" />
  </ProgressLinearTrack>
</ProgressLinear>