<script setup lang="ts">
import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderLabel,
  AngleSliderMarker,
  AngleSliderMarkerGroup,
  AngleSliderThumb,
  AngleSliderValueText,
} from '@moduix/vue/angle-slider';

const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<template>
  <AngleSlider :default-value="135">
    <AngleSliderLabel>Rotation</AngleSliderLabel>
    <AngleSliderControl>
      <AngleSliderValueText />
      <AngleSliderMarkerGroup>
        <AngleSliderMarker v-for="value in markerValues" :key="value" :value="value" />
      </AngleSliderMarkerGroup>
      <AngleSliderThumb />
    </AngleSliderControl>
  </AngleSlider>
</template>