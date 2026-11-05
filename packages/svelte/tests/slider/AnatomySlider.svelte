<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderHiddenInput,
    SliderLabel,
    SliderRange,
    SliderThumb,
    SliderThumbs,
    SliderTrack,
    SliderValueText,
  } from '@/components/slider';

  let rootRef: Element | null = $state(null);
  let thumbRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, thumbRef });
</script>

<form id="slider-form"></form>
<Slider bind:ref={rootRef} defaultValue={[40]} name="volume" data-probe="root">
  <SliderLabel>Volume</SliderLabel>
  <SliderValueText />
  <SliderControl data-probe="control">
    <SliderTrack><SliderRange /></SliderTrack>
    <SliderThumb bind:ref={thumbRef} index={0} aria-label="Volume">
      <SliderHiddenInput form="slider-form" />
    </SliderThumb>
  </SliderControl>
</Slider>
<Slider defaultValue={[20, 80]} name="range" form="slider-form">
  <SliderLabel>Range</SliderLabel>
  <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
</Slider>