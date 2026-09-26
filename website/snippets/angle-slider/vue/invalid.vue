<script setup lang="ts">
import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/vue/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-invalid.module.css';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<template>
  <AngleSlider :default-value="315" invalid aria-label="Invalid heading" :class="styles.root">
    <AngleSliderLabel>Heading</AngleSliderLabel>
    <AngleSliderDial>
      <AngleSliderMarks :values="markerValues" />
    </AngleSliderDial>
    <AngleSliderHiddenInput />
  </AngleSlider>
</template>