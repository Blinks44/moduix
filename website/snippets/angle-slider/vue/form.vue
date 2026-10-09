<script setup lang="ts">
import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/vue/angle-slider';
import { ref } from 'vue';
import styles from '@/components/examples/angle-slider/angle-slider-form.module.css';

const submitted = ref('Nothing submitted');
const markerValues = [0, 45, 90, 135, 180, 225, 270, 315];

const handleSubmit = (event: SubmitEvent) => {
  const form = event.currentTarget as HTMLFormElement;
  submitted.value = `${String(new FormData(form).get('rotation') ?? '')}°`;
};
</script>

<template>
  <form :class="styles.layout" @submit.prevent="handleSubmit">
    <AngleSlider :default-value="135" aria-label="Rotation" name="rotation" :class="styles.root">
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks :values="markerValues" />
      </AngleSliderDial>
      <AngleSliderHiddenInput />
    </AngleSlider>
    <div>
      <output>Submitted: {{ submitted }}</output>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>