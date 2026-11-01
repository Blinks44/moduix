<script setup lang="ts">
import {
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderRootProvider,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
  useSlider,
} from '@moduix/vue/slider';
import { Stack } from '@moduix/vue/stack';

const slider = useSlider({
  defaultValue: [40],
});
</script>

<template>
  <Stack align="center" gap="4">
    <SliderRootProvider :value="slider">
      <SliderLabel>Volume</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
    </SliderRootProvider>
    <output>Current: {{ slider.value.join(', ') }}</output>
    <button type="button" @click="slider.focus()">Focus</button>
  </Stack>
</template>