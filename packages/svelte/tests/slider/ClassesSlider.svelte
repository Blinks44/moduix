<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderHiddenInput,
    SliderLabel,
    SliderRange,
    SliderThumb,
    SliderTrack,
  } from '@/components/slider';
</script>

<Slider class="consumer-root" defaultValue={[40]}>
  <SliderLabel class="consumer-label">Volume</SliderLabel>
  <SliderControl class="consumer-control">
    <SliderTrack class="consumer-track">
      <SliderRange class="consumer-range" />
    </SliderTrack>
    <SliderThumb class="consumer-thumb" index={0} aria-label="Volume">
      <SliderHiddenInput />
    </SliderThumb>
  </SliderControl>
</Slider>