<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@/components/slider';
import styles from './NestedSlider.module.css';

defineProps<{ label: string }>();
</script>

<template>
  <Slider :default-value="[40]" :class="styles.root">
    <SliderLabel :class="styles.label">{{ label }}</SliderLabel>
    <SliderControl :class="styles.control">
      <SliderTrack :class="styles.track">
        <SliderRange :class="styles.range" />
      </SliderTrack>
      <SliderThumb :index="0" :class="styles.thumb">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</template>