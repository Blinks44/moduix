<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from '@moduix/vue/slider';
</script>

<template>
  <Slider :default-value="[40]">
    <SliderLabel>Volume</SliderLabel>
    <SliderValueText />
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb as-child :index="0" aria-label="Volume">
        <span><SliderHiddenInput /></span>
      </SliderThumb>
    </SliderControl>
  </Slider>
</template>