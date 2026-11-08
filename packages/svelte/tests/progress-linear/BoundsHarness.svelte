<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearContext,
    ProgressLinearRange,
    ProgressLinearTrack,
    ProgressLinearValueText,
  } from '@/components/progress-linear';
</script>

<ProgressLinear
  defaultValue={420}
  min={200}
  max={800}
  translations={{ value: ({ value, max }) => `${value} of ${max} requests completed` }}
>
  <ProgressLinearContext>
    {#snippet render(state)}
      <ProgressLinearValueText>{state().valueAsString}</ProgressLinearValueText>
    {/snippet}
  </ProgressLinearContext>
  <ProgressLinearTrack aria-label="Request migration">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinear>