<script lang="ts">
  import type { SliderValueChangeDetails } from '@moduix/svelte/slider';
  import {
    Slider,
    SliderControl,
    SliderLabel,
    SliderRange,
    SliderThumbs,
    SliderTrack,
    SliderValueText,
  } from '@moduix/svelte/slider';
  import { Stack } from '@moduix/svelte/stack';

  let liveValue = $state([40]);
  let committedValue = $state([40]);

  const handleValueChange = (details: SliderValueChangeDetails) => {
    liveValue = details.value;
  };

  const handleValueChangeEnd = (details: SliderValueChangeDetails) => {
    committedValue = details.value;
  };
</script>

<Stack align="center" gap="4">
  <Slider
    defaultValue={[40]}
    onValueChange={handleValueChange}
    onValueChangeEnd={handleValueChangeEnd}
  >
    <SliderLabel>Gain</SliderLabel>
    <SliderValueText />
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
  </Slider>
  <div data-preview-meta>
    <output>Live: {liveValue.join(', ')} / Committed: {committedValue.join(', ')}</output>
  </div>
</Stack>