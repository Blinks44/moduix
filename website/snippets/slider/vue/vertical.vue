<script setup lang="ts">
import { Slider, SliderControl, SliderRange, SliderThumbs, SliderTrack } from '@moduix/vue/slider';
import { ref } from 'vue';
import styles from '@/components/examples/slider/slider-vertical.module.css';

const value = ref([60]);
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
    </Slider>
    <output>Output: {{ value.join(', ') }}</output>
  </div>
</template>