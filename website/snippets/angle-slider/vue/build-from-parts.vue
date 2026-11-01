<script setup lang="ts">
import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderThumb,
  AngleSliderValueText,
} from '@moduix/vue/angle-slider';
</script>

<template>
  <AngleSlider :default-value="135" aria-label="Rotation">
    <AngleSliderControl>
      <AngleSliderValueText />
      <AngleSliderThumb />
    </AngleSliderControl>
  </AngleSlider>
</template>