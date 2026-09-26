<script setup lang="ts">
import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/vue/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-read-only.module.css';

const initialValue = 300;
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<template>
  <AngleSlider
    :default-value="initialValue"
    read-only
    aria-label="Locked angle"
    :class="styles.root"
  >
    <AngleSliderLabel>Locked angle</AngleSliderLabel>
    <AngleSliderDial>
      <AngleSliderMarks :values="markerValues" />
    </AngleSliderDial>
    <AngleSliderHiddenInput />
  </AngleSlider>
</template>