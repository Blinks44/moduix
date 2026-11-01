<script setup lang="ts">
import { Slider, SliderControl, SliderRange, SliderThumbs, SliderTrack } from '@moduix/vue/slider';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const value = ref([60]);
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
    </Slider>
    <output>Output: {{ value.join(', ') }}</output>
  </Stack>
</template>