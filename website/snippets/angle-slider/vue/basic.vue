<script setup lang="ts">
import { AngleSlider, AngleSliderDial, AngleSliderHiddenInput } from '@moduix/vue/angle-slider';
import styles from '@/components/examples/angle-slider/angle-slider-basic.module.css';
</script>

<template>
  <AngleSlider :default-value="135" aria-label="Rotation" :class="styles.root">
    <AngleSliderDial />
    <AngleSliderHiddenInput />
  </AngleSlider>
</template>