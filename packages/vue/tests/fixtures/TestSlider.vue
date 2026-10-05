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
} from '../../src/components/slider';
</script>

<template>
  <Slider id="slider-ssr" :default-value="[50]">
    <SliderLabel>Hydrated volume</SliderLabel>
    <SliderValueText />
    <SliderControl>
      <SliderTrack><SliderRange /></SliderTrack>
      <SliderThumbs />
    </SliderControl>
    <SliderMarkerGroup>
      <SliderMarker v-for="value in [0, 50, 100]" :key="value" :value="value">{{
        value
      }}</SliderMarker>
    </SliderMarkerGroup>
  </Slider>
</template>