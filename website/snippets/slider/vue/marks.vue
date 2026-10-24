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

const marks = [0, 25, 50, 75, 100];
</script>

<template>
  <Slider :default-value="[50]">
    <SliderLabel>Progress</SliderLabel>
    <SliderValueText />
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
    <SliderMarkerGroup>
      <SliderMarker v-for="value in marks" :key="value" :value="value">{{ value }}</SliderMarker>
    </SliderMarkerGroup>
  </Slider>
</template>