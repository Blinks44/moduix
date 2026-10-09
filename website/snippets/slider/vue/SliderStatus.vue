<script setup lang="ts">
import { SliderLabel, useSliderContext } from '@moduix/vue/slider';
const slider = useSliderContext();
</script>

<template>
  <SliderLabel
    >Value: {{ slider.value.join(', ') }} · Dragging: {{ String(slider.dragging) }}</SliderLabel
  >
</template>