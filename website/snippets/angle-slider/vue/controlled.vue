<script setup lang="ts">
import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/vue/angle-slider';
import { ref } from 'vue';
import styles from '@/components/examples/angle-slider/angle-slider-controlled.module.css';

const value = ref(210);
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<template>
  <AngleSlider v-model="value" aria-label="Heading" :class="styles.root">
    <AngleSliderLabel>Heading</AngleSliderLabel>
    <AngleSliderDial>
      <AngleSliderMarks :values="markerValues" />
    </AngleSliderDial>
    <AngleSliderHiddenInput />
  </AngleSlider>
</template>