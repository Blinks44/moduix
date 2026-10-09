<script setup lang="ts">
import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarker,
  AngleSliderMarkerGroup,
  AngleSliderThumb,
  AngleSliderValueText,
} from '@moduix/vue/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-advanced-customization.module.css';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<template>
  <AngleSlider :default-value="135" aria-label="Rotation" :class="styles.root">
    <AngleSliderLabel>Rotation</AngleSliderLabel>
    <AngleSliderControl>
      <AngleSliderValueText />
      <AngleSliderMarkerGroup>
        <AngleSliderMarker v-for="value in markerValues" :key="value" :value="value" />
      </AngleSliderMarkerGroup>
      <AngleSliderThumb />
    </AngleSliderControl>
    <AngleSliderHiddenInput />
  </AngleSlider>
</template>