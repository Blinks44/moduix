<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/vue/slider';
import styles from '@/components/examples/slider/slider-marks.module.css';

const marks = [0, 25, 50, 75, 100];
</script>

<template>
  <Slider :default-value="[50]">
    <div :class="styles.header">
      <SliderLabel>Progress</SliderLabel>
      <SliderValueText />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
    <SliderMarkerGroup :class="styles.markerGroup">
      <SliderMarker v-for="value in marks" :key="value" :value="value">{{ value }}</SliderMarker>
    </SliderMarkerGroup>
  </Slider>
</template>