<script lang="ts">
  import {
    ProgressCircular,
    ProgressCircularLabel,
    ProgressCircularRing,
    ProgressCircularValueText,
  } from '@moduix/svelte/progress-circular';
  import {
    Slider,
    SliderControl,
    SliderHiddenInput,
    SliderLabel,
    SliderRange,
    SliderThumb,
    SliderTrack,
    SliderValueText,
  } from '@moduix/svelte/slider';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/progress-circular/component-controlled.module.css';

  let value = $state<number | null>(42);
</script>

<Stack align="center" gap="4">
  <ProgressCircular bind:value>
    <ProgressCircularLabel>Upload status</ProgressCircularLabel>
    <div class={styles.circleContainer}>
      <ProgressCircularRing aria-label="Upload status" />
      <ProgressCircularValueText />
    </div>
  </ProgressCircular>
  <div data-preview-meta>
    <output>Progress: {value ?? 'loading'}%</output>
    <Slider
      class={styles.slider}
      value={[value ?? 0]}
      min={0}
      max={100}
      onValueChange={(details) => (value = details.value[0] ?? 0)}
    >
      <SliderLabel>Progress value</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb index={0} aria-label="Progress value">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  </div>
</Stack>