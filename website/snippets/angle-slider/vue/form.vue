<script setup lang="ts">
import {
  AngleSlider,
  AngleSliderDial,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderMarks,
} from '@moduix/vue/angle-slider';
import { Button } from '@moduix/vue/button';
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
    <AngleSlider :default-value="135" name="rotation">
      <AngleSliderLabel>Rotation</AngleSliderLabel>
      <AngleSliderDial>
        <AngleSliderMarks :values="markerValues" />
      </AngleSliderDial>
      <AngleSliderHiddenInput />
    </AngleSlider>
    <div data-preview-meta>
      <output>Submitted: {{ submitted }}</output>
      <Button type="submit" size="sm">Submit</Button>
    </div>
  </form>
</template>