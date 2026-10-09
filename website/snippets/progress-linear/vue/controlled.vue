<script setup lang="ts">
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearTrack,
  ProgressLinearValueText,
} from '@moduix/vue/progress-linear';
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

const value = ref<number | null>(45);
const handleSliderValueChange = (details: { value: number[] }) => {
  value.value = details.value[0] ?? 0;
};
</script>

<template>
  <ProgressLinear v-model="value">
    <ProgressLinearLabel>Upload status</ProgressLinearLabel>
    <ProgressLinearValueText />
    <ProgressLinearTrack aria-label="Upload status">
      <ProgressLinearRange />
    </ProgressLinearTrack>
  </ProgressLinear>
  <Slider :model-value="[value ?? 0]" :min="0" :max="100" @value-change="handleSliderValueChange">
    <SliderLabel>Progress value</SliderLabel>
    <SliderValueText />
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb :index="0" aria-label="Progress value">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</template>