<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderRange,
    SliderThumbs,
    SliderTrack,
    SliderValueText,
    SliderLabel,
  } from '@/components/slider';
</script>

<div style="width: 20rem">
  <Slider defaultValue={[40]}>
    <SliderLabel>Volume</SliderLabel>
    <SliderValueText />
    <SliderControl>
      <SliderTrack><SliderRange /></SliderTrack>
      <SliderThumbs />
    </SliderControl>
  </Slider>
</div>