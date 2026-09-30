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
  <Slider :default-value="[30, 60]">
    <SliderLabel>Price range</SliderLabel>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
    <SliderValueText />
  </Slider>
</template>