<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderLabel,
    SliderRange,
    SliderThumbs,
    SliderTrack,
  } from '@/components/slider';

  let { changes }: { changes: Array<{ value: number[] }> } = $props();
</script>

<Slider onValueChange={(details) => changes.push(details)}>
  <SliderLabel>Volume</SliderLabel>
  <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
</Slider>
<Slider readOnly onValueChange={(details) => changes.push(details)}>
  <SliderLabel>Read-only volume</SliderLabel>
  <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
</Slider>
<Slider disabled onValueChange={(details) => changes.push(details)}>
  <SliderLabel>Disabled volume</SliderLabel>
  <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
</Slider>