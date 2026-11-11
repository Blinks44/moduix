<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderLabel,
    SliderRange,
    SliderThumbs,
    SliderTrack,
    SliderValueText,
  } from '@moduix/svelte/slider';
</script>

<Slider min={-10} max={10} defaultValue={[0]}>
  <SliderLabel>Offset</SliderLabel>
  <SliderValueText />
  <SliderControl>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumbs />
  </SliderControl>
</Slider>