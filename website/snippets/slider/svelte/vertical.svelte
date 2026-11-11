<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderRange,
    SliderThumbs,
    SliderTrack,
  } from '@moduix/svelte/slider';
  import { Stack } from '@moduix/svelte/stack';

  let value = $state([60]);
</script>

<Stack align="center" gap="3">
  <Slider bind:value aria-label={['Output']} orientation="vertical">
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
  </Slider>
  <output>Output: {value.join(', ')}</output>
</Stack>