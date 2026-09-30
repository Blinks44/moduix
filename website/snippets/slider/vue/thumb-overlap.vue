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
import styles from '@/components/examples/slider/slider-thumb-overlap.module.css';
</script>

<template>
  <Slider :default-value="[25, 60]" :min-steps-between-thumbs="5">
    <div :class="styles.header">
      <SliderLabel>Minimum gap</SliderLabel>
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