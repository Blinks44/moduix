<script lang="ts">
  import {
    ProgressCircular,
    ProgressCircularCircle,
    ProgressCircularCircleRange,
    ProgressCircularCircleTrack,
    ProgressCircularContext,
    ProgressCircularValueText,
    ProgressCircularView,
  } from '@/components/progress-circular';

  let value: number | null = $state(10);
</script>

<ProgressCircular
  bind:value
  min={10}
  max={30}
  translations={{ value: ({ value, max }) => `Processed ${value} of ${max}` }}
>
  <ProgressCircularCircle>
    <ProgressCircularCircleTrack />
    <ProgressCircularCircleRange />
  </ProgressCircularCircle>
  <ProgressCircularContext>
    {#snippet render(state)}
      <ProgressCircularValueText>{state().valueAsString}</ProgressCircularValueText>
    {/snippet}
  </ProgressCircularContext>
  <ProgressCircularView state="loading">Import in progress</ProgressCircularView>
  <ProgressCircularView state="complete">Import complete</ProgressCircularView>
</ProgressCircular>
<button type="button" onclick={() => (value = 30)}>Complete import</button>