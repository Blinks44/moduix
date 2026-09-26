<script setup lang="ts">
import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/vue/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-with-marks.module.css';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<template>
  <AngleSlider :default-value="135" aria-label="Rotation" :class="styles.root">
    <AngleSliderLabel>Rotation</AngleSliderLabel>
    <AngleSliderDial>
      <AngleSliderMarks :values="markerValues" />
    </AngleSliderDial>
    <AngleSliderHiddenInput />
  </AngleSlider>
</template>