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
import styles from '@/components/examples/slider/slider-advanced-customization.module.css';
</script>

<template>
  <Slider :default-value="[40]">
    <div :class="styles.header">
      <SliderLabel>Volume</SliderLabel>
      <SliderValueText />
    </div>
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