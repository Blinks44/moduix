<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderLabel,
    SliderMarker,
    SliderMarkerGroup,
    SliderRange,
    SliderThumbs,
    SliderTrack,
    SliderValueText,
  } from '@moduix/svelte/slider';

  const marks = [0, 50, 100];
</script>

<Slider defaultValue={[32]} invalid>
  <SliderLabel>Volume</SliderLabel>
  <SliderValueText />
  <SliderControl>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumbs />
  </SliderControl>
  <SliderMarkerGroup>
    {#each marks as value (value)}
      <SliderMarker {value}>{value}</SliderMarker>
    {/each}
  </SliderMarkerGroup>
</Slider>