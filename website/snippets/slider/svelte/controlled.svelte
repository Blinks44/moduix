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

  let value = $state([24]);
</script>

<Slider bind:value>
  <SliderLabel>Brightness</SliderLabel>
  <SliderValueText />
  <SliderControl>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumbs />
  </SliderControl>
</Slider>