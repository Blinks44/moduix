<script setup lang="ts">
import {
  AngleSliderDial,
  AngleSliderLabel,
  AngleSliderMarks,
  AngleSliderRootProvider,
  useAngleSlider,
} from '@moduix/vue/angle-slider';
import { Stack } from '@moduix/vue/stack';

const angleSlider = useAngleSlider({ defaultValue: 45 });
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];
</script>

<template>
  <Stack align="center" gap="3">
    <AngleSliderRootProvider :value="angleSlider">
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks :values="markerValues" />
      </AngleSliderDial>
    </AngleSliderRootProvider>
    <output>Current angle: {{ angleSlider.value }}°</output>
  </Stack>
</template>