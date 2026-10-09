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
import styles from '@/components/examples/slider/slider-thumb-collision.module.css';
</script>

<template>
  <Slider :default-value="[25, 60]" thumb-collision-behavior="push">
    <div :class="styles.header">
      <SliderLabel>Linked range</SliderLabel>
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