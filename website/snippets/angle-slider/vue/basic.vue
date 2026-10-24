<script setup lang="ts">
import { AngleSlider, AngleSliderDial } from '@moduix/vue/angle-slider';
</script>

<template>
  <AngleSlider :default-value="135" aria-label="Rotation">
    <AngleSliderDial />
  </AngleSlider>
</template>