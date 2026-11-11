<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearLabel,
    ProgressLinearRange,
    ProgressLinearTrack,
    ProgressLinearValueText,
  } from '@moduix/svelte/progress-linear';
  import {
    Slider,
    SliderControl,
    SliderHiddenInput,
    SliderLabel,
    SliderRange,
    SliderThumb,
    SliderTrack,
    SliderValueText,
  } from '@moduix/svelte/slider';

  let value = $state<number | null>(45);
</script>

<ProgressLinear bind:value>
  <ProgressLinearLabel>Upload status</ProgressLinearLabel>
  <ProgressLinearValueText />
  <ProgressLinearTrack aria-label="Upload status">
    <ProgressLinearRange />
  </ProgressLinearTrack>
</ProgressLinear>
<Slider
  value={[value ?? 0]}
  min={0}
  max={100}
  onValueChange={(details) => (value = details.value[0] ?? 0)}
>
  <SliderLabel>Progress value</SliderLabel>
  <SliderValueText />
  <SliderControl>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb index={0} aria-label="Progress value">
      <SliderHiddenInput />
    </SliderThumb>
  </SliderControl>
</Slider>