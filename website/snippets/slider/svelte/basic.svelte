<script lang="ts">
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
</script>

<Slider defaultValue={[40]}>
  <SliderLabel>Volume</SliderLabel>
  <SliderValueText />
  <SliderControl>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb index={0} aria-label="Volume">
      <SliderHiddenInput />
    </SliderThumb>
  </SliderControl>
</Slider>