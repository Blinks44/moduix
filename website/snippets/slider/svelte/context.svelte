<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderRange,
    SliderThumbs,
    SliderTrack,
  } from '@moduix/svelte/slider';
  import SliderStatus from './SliderStatus.svelte';
</script>

<Slider defaultValue={[40]}>
  <SliderStatus />
  <SliderControl>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumbs />
  </SliderControl>
</Slider>