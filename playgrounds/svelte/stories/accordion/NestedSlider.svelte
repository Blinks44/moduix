<script lang="ts">
  // Ark Slider parts stand in until the moduix Slider is ported to Svelte.
  import {
    SliderControl,
    SliderHiddenInput,
    SliderLabel,
    SliderRange,
    SliderRoot,
    SliderThumb,
    SliderTrack,
  } from '@ark-ui/svelte/slider';
  import styles from './NestedSlider.module.css';

  let { label }: { label: string } = $props();
</script>

<SliderRoot defaultValue={[40]} class={styles.root}>
  <SliderLabel class={styles.label}>{label}</SliderLabel>
  <SliderControl class={styles.control}>
    <SliderTrack class={styles.track}>
      <SliderRange class={styles.range} />
    </SliderTrack>
    <SliderThumb index={0} class={styles.thumb}>
      <SliderHiddenInput />
    </SliderThumb>
  </SliderControl>
</SliderRoot>