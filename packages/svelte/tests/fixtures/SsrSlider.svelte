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
  } from '@/components/slider';
</script>

<Slider id="slider-ssr" defaultValue={[50]}>
  <SliderLabel>Hydrated volume</SliderLabel>
  <SliderValueText />
  <SliderControl>
    <SliderTrack><SliderRange /></SliderTrack>
    <SliderThumbs />
  </SliderControl>
  <SliderMarkerGroup>
    {#each [0, 50, 100] as value (value)}
      <SliderMarker {value}>{value}</SliderMarker>
    {/each}
  </SliderMarkerGroup>
</Slider>