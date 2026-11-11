<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearRange,
    ProgressLinearTrack,
  } from '@/components/progress-linear';

  let value: number | null = $state(45);
</script>

<ProgressLinear bind:value>
  <ProgressLinearTrack aria-label="Upload status"><ProgressLinearRange /></ProgressLinearTrack>
</ProgressLinear>
<button type="button" onclick={() => (value = 75)}>Set progress</button>
<output>Current value: {value}</output>