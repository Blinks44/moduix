<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumbs,
  SliderTrack,
} from '@moduix/vue/slider';
import { ref } from 'vue';
import styles from '@/components/examples/slider/slider-vertical-with-marks.module.css';

const marks = [0, 25, 50, 75, 100];
const value = ref([50]);
</script>

<template>
  <div :class="styles.stack">
    <Slider v-model="value" :aria-label="['Output']" orientation="vertical">
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
      <SliderMarkerGroup>
        <SliderMarker v-for="mark in marks" :key="mark" :value="mark">{{ mark }}</SliderMarker>
      </SliderMarkerGroup>
    </Slider>
    <output>Output: {{ value.join(', ') }}</output>
  </div>
</template>