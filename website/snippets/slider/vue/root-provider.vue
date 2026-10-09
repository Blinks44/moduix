<script setup lang="ts">
import {
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderRootProvider,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
  useSlider,
} from '@moduix/vue/slider';
import styles from '@/components/examples/slider/slider-root-provider.module.css';

const slider = useSlider({
  defaultValue: [40],
});
</script>

<template>
  <div :class="styles.stack">
    <SliderRootProvider :value="slider">
      <SliderLabel>Volume</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
    </SliderRootProvider>
    <output>Current: {{ slider.value.join(', ') }}</output>
    <button type="button" @click="slider.focus()">Focus</button>
  </div>
</template>