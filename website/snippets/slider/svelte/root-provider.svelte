<script lang="ts">
  import {
    SliderControl,
    SliderLabel,
    SliderRange,
    SliderRootProvider,
    SliderThumbs,
    SliderTrack,
    SliderValueText,
    useSlider,
  } from '@moduix/svelte/slider';
  import { Stack } from '@moduix/svelte/stack';

  const id = $props.id();
  const slider = useSlider({
    id,
    defaultValue: [40],
  });
</script>

<Stack align="center" gap="4">
  <SliderRootProvider value={slider}>
    <SliderLabel>Volume</SliderLabel>
    <SliderValueText />
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
  </SliderRootProvider>
  <div data-preview-meta>
    <output>Current: {slider().value.join(', ')}</output>
    <button type="button" onclick={() => slider().focus()}>Focus</button>
  </div>
</Stack>