<script lang="ts">
  import {
    AngleSlider,
    AngleSliderDial,
    AngleSliderLabel,
    AngleSliderMarks,
  } from '@moduix/svelte/angle-slider';
  import styles from '@/components/examples/angle-slider/angle-slider-controlled.module.css';

  let value = $state(210);
  const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<AngleSlider bind:value class={styles.root}>
  <AngleSliderLabel>Heading</AngleSliderLabel>
  <AngleSliderDial>
    <AngleSliderMarks values={markerValues} />
  </AngleSliderDial>
</AngleSlider>