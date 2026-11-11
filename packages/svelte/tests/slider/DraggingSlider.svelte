<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderDraggingIndicator,
    SliderRange,
    SliderThumb,
    SliderTrack,
  } from '@/components/slider';

  const orientations = ['horizontal', 'vertical'] as const;
</script>

{#each orientations as orientation (orientation)}
  <Slider defaultValue={[40]} {orientation}>
    <SliderControl>
      <SliderTrack><SliderRange /></SliderTrack>
      <SliderThumb index={0} aria-label={orientation}>
        <SliderDraggingIndicator>40</SliderDraggingIndicator>
      </SliderThumb>
    </SliderControl>
  </Slider>
{/each}