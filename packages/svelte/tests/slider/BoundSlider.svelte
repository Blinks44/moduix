<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderLabel,
    SliderRange,
    SliderThumbs,
    SliderTrack,
  } from '@/components/slider';

  let { details }: { details: number[][] } = $props();
  let value = $state([40]);
</script>

<Slider bind:value onValueChange={(event) => details.push(event.value)}>
  <SliderLabel>Volume</SliderLabel>
  <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
</Slider>
<output>Value: {value.join(', ')}</output>