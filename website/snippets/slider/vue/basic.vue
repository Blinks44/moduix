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
import styles from '@/components/examples/slider/slider-basic.module.css';
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
      <SliderThumb :index="0" aria-label="Volume">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</template>