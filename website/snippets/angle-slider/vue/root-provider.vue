<script setup lang="ts">
import {
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
  AngleSliderRootProvider,
  useAngleSlider,
} from '@moduix/vue/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-root-provider.module.css';

const angleSlider = useAngleSlider({ defaultValue: 45, 'aria-label': 'Rotation' });
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<template>
  <div :class="styles.layout">
    <AngleSliderRootProvider :value="angleSlider" :class="styles.root">
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks :values="markerValues" />
      </AngleSliderDial>
      <AngleSliderHiddenInput />
    </AngleSliderRootProvider>
    <output>Current angle: {{ angleSlider.value }}°</output>
  </div>
</template>