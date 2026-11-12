<script setup lang="ts">
import { Button } from '@moduix/vue/button';
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
      <SliderLabel>Volume</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb :index="0" aria-label="Volume">
          <SliderHiddenInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
    <div data-preview-meta>
      <output>Submitted: {{ submitted }}</output>
      <Button type="submit" size="sm">Submit</Button>
      <Button type="reset" size="sm" variant="outline">Reset</Button>
    </div>
  </form>
</template>