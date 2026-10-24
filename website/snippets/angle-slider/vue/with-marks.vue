<script setup lang="ts">
import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/vue/angle-slider';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<template>
  <AngleSlider :default-value="135">
    <AngleSliderLabel>Rotation</AngleSliderLabel>
    <AngleSliderDial>
      <AngleSliderMarks :values="markerValues" />
    </AngleSliderDial>
  </AngleSlider>
</template>