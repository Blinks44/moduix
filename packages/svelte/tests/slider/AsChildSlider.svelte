<script lang="ts">
  import {
    Slider,
    SliderControl,
    SliderHiddenInput,
    SliderRange,
    SliderThumb,
    SliderTrack,
  } from '@/components/slider';

  let rootRef: Element | null = $state(null);
  let controlRef: Element | null = $state(null);
  let thumbRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, controlRef, thumbRef });
</script>

<Slider bind:ref={rootRef} defaultValue={[40]}>
  {#snippet asChild(props)}
    <section {...props()}>
      <SliderControl bind:ref={controlRef}>
        <SliderTrack><SliderRange /></SliderTrack>
        <SliderThumb bind:ref={thumbRef} index={0} aria-label="Volume">
          {#snippet asChild(thumbProps)}
            <span {...thumbProps()}><SliderHiddenInput /></span>
          {/snippet}
        </SliderThumb>
      </SliderControl>
    </section>
  {/snippet}
</Slider>