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
import styles from '@/components/examples/slider/slider-thumb-alignment.module.css';
</script>

<template>
  <Slider :default-value="[0]" thumb-alignment="center">
    <div :class="styles.header">
      <SliderLabel>Centered thumb</SliderLabel>
      <SliderValueText />
    </div>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
  </Slider>
</template>