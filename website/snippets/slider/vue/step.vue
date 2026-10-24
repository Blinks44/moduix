<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/vue/slider';
</script>

<template>
  <Slider :step="0.01" :min="5" :max="10" :default-value="[7.5]">
    <SliderLabel>Precision</SliderLabel>
    <SliderValueText />
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
  </Slider>
</template>