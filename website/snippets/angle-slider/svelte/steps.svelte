<script lang="ts">
  import {
    AngleSlider,
    AngleSliderDial,
    AngleSliderLabel,
    AngleSliderMarks,
  } from '@moduix/svelte/angle-slider';
  import styles from '@/components/examples/angle-slider/angle-slider-steps.module.css';

  const initialValue = 60;
  const step = 15;
  const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<AngleSlider defaultValue={initialValue} {step} class={styles.root}>
  <AngleSliderLabel>15 Step</AngleSliderLabel>
  <AngleSliderDial>
    <AngleSliderMarks values={markerValues} />
  </AngleSliderDial>
</AngleSlider>