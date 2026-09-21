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

defineProps<{ label: string }>();
</script>

<template>
  <SliderRoot :default-value="[40]" :class="$style.root">
    <SliderLabel :class="$style.label">{{ label }}</SliderLabel>
    <SliderControl :class="$style.control">
      <SliderTrack :class="$style.track">
        <SliderRange :class="$style.range" />
      </SliderTrack>
      <SliderThumb :index="0" :class="$style.thumb">
        <SliderHiddenInput />
      </SliderThumb>
    </SliderControl>
  </SliderRoot>
</template>

<style module src="./NestedSlider.module.css" />