<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumbs,
  SliderTrack,
} from '@moduix/vue/slider';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const marks = [0, 25, 50, 75, 100];
const value = ref([50]);
</script>

<template>
  <Stack align="center" gap="3">
    <Slider v-model="value" :aria-label="['Output']" orientation="vertical">
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
      <SliderMarkerGroup>
        <SliderMarker v-for="mark in marks" :key="mark" :value="mark">{{ mark }}</SliderMarker>
      </SliderMarkerGroup>
    </Slider>
    <div data-preview-meta>
      <output>Output: {{ value.join(', ') }}</output>
    </div>
  </Stack>
</template>