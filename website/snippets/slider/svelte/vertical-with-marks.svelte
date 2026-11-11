<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderMarker,
    SliderMarkerGroup,
    SliderRange,
    SliderThumbs,
    SliderTrack,
  } from '@moduix/svelte/slider';
  import { Stack } from '@moduix/svelte/stack';

  const marks = [0, 25, 50, 75, 100];
  let value = $state([50]);
</script>

<Stack align="center" gap="3">
  <Slider bind:value aria-label={['Output']} orientation="vertical">
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
    <SliderMarkerGroup>
      {#each marks as mark (mark)}
        <SliderMarker value={mark}>{mark}</SliderMarker>
      {/each}
    </SliderMarkerGroup>
  </Slider>
  <output>Output: {value.join(', ')}</output>
</Stack>