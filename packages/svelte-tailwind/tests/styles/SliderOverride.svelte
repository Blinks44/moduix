<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderHiddenInput,
    SliderLabel,
    SliderMarker,
    SliderMarkerGroup,
    SliderRange,
    SliderThumb,
    SliderTrack,
  } from '@/components/slider';
</script>

<Slider class="w-64" defaultValue={[40]}>
  <SliderLabel class="text-primary">Volume</SliderLabel>
  <SliderControl class="min-h-6">
    <SliderTrack><SliderRange /></SliderTrack>
    <SliderThumb class="border-primary" index={0} aria-label="Volume">
      <SliderHiddenInput />
    </SliderThumb>
  </SliderControl>
  <SliderMarkerGroup>
    <SliderMarker value={0} class="text-primary">0</SliderMarker>
  </SliderMarkerGroup>
</Slider>