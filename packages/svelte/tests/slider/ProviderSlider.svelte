<script lang="ts">
  import {
    SliderContext,
    SliderControl,
    SliderRange,
    SliderRootProvider,
    SliderThumbs,
    SliderTrack,
    useSlider,
  } from '@/components/slider';
  import SliderStatus from './SliderStatus.svelte';

  const slider = useSlider({ id: 'provider-slider', defaultValue: [40], name: 'provider-volume' });
</script>

<div>
  <SliderRootProvider value={slider}>
    <SliderStatus />
    <SliderContext>
      {#snippet render(context)}
        <output>Slot: {context().value.join(', ')}</output>
      {/snippet}
    </SliderContext>
    <SliderControl><SliderTrack><SliderRange /></SliderTrack><SliderThumbs /></SliderControl>
  </SliderRootProvider>
  <button type="button" onclick={() => slider().setValue([80])}>Set to 80</button>
</div>