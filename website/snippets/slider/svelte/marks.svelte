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

  const marks = [0, 25, 50, 75, 100];
</script>

<Slider defaultValue={[50]}>
  <SliderLabel>Progress</SliderLabel>
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