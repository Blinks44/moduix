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
import { ref } from 'vue';
import styles from '@/components/examples/slider/slider-controlled.module.css';

const value = ref([24]);
</script>

<template>
  <Slider v-model="value">
    <div :class="styles.header">
      <SliderLabel>Brightness</SliderLabel>
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