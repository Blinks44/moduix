<script lang="ts">
  import {
    AngleSlider,
    AngleSliderControl,
    AngleSliderHiddenInput,
    AngleSliderMarks,
    AngleSliderThumb,
  } from '@/components/angle-slider';

  let rootRef: Element | null = $state(null);
  let controlRef: Element | null = $state(null);
  let thumbRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, controlRef, thumbRef });
</script>

<AngleSlider bind:ref={rootRef} defaultValue={90}>
  {#snippet asChild(props)}
    <section {...props()}>
      <AngleSliderControl bind:ref={controlRef}>
        <AngleSliderMarks values={[0, 90, 90, 180]} />
        <AngleSliderThumb bind:ref={thumbRef} />
      </AngleSliderControl>
      <AngleSliderHiddenInput />
    </section>
  {/snippet}
</AngleSlider>