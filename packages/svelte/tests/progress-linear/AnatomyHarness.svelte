<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearTrack,
    ProgressLinearValueText,
  } from '@/components/progress-linear';

  let rootRef: Element | null = $state(null);
  let trackRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, trackRef });
</script>

<ProgressLinear bind:ref={rootRef} defaultValue={42}>
  <ProgressLinearLabel>Export data</ProgressLinearLabel>
  <ProgressLinearValueText />
  <ProgressLinearTrack bind:ref={trackRef} aria-label="Export data">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinear>