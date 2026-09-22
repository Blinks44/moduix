<script setup lang="ts">
import {
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/vue/slider';
import styles from './NestedSlider.module.css';

defineProps<{ label: string }>();
</script>

<template>
  <SliderRoot :default-value="[40]" :class="styles.root">
    <SliderLabel :class="styles.label">{{ label }}</SliderLabel>
    <SliderControl :class="styles.control">
      <SliderTrack :class="styles.track">
        <SliderRange :class="styles.range" />
      </SliderTrack>
      <SliderThumb :index="0" :class="styles.thumb">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </SliderRoot>
</template>