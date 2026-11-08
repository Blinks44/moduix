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

<Slider defaultValue={[30, 60]}>
  <SliderLabel>Price range</SliderLabel>
  <SliderControl>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumbs />
  </SliderControl>
  <SliderValueText />
</Slider>