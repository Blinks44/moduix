<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderDraggingIndicator,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@moduix/vue/slider';
</script>

<template>
  <Slider :default-value="[40]">
    <SliderLabel>Gain</SliderLabel>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb :index="0" aria-label="Gain">
        <SliderDraggingIndicator />
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </Slider>
</template>