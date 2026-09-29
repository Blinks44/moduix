<script setup lang="ts">
import {
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/vue/slider';
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearRange,
  ProgressLinearTrack,
  ProgressLinearValueText,
} from '@moduix/vue/progress-linear';
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
  <SliderRoot
    :model-value="[value ?? 0]"
    :min="0"
    :max="100"
    @value-change="handleSliderValueChange"
  >
    <SliderLabel>Progress value</SliderLabel>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb :index="0" aria-label="Progress value">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </SliderRoot>
</template>