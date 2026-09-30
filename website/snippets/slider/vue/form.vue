<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from '@moduix/vue/slider';
import { ref } from 'vue';
import styles from '@/components/examples/slider/slider-form.module.css';

const submitted = ref('Nothing submitted');

const handleSubmit = (event: SubmitEvent) => {
  const form = event.currentTarget as HTMLFormElement;
  submitted.value = String(new FormData(form).get('volume') ?? '');
};

const handleReset = () => {
  submitted.value = 'Nothing submitted';
};
</script>

<template>
  <form :class="styles.stack" @reset="handleReset" @submit.prevent="handleSubmit">
    <Slider :default-value="[40]" name="volume">
      <div :class="styles.header">
        <SliderLabel>Volume</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb :index="0" aria-label="Volume">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
    <output>Submitted: {{ submitted }}</output>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </form>
</template>