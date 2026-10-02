<script setup lang="ts">
import { Slider, SliderControl, SliderRange, SliderThumbs, SliderTrack } from '@moduix/vue/slider';
import SliderStatus from './SliderStatus.vue';
</script>

<template>
  <Slider :default-value="[40]">
    <SliderStatus />
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
  </Slider>
</template>