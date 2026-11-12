<script setup lang="ts">
import type { SliderValueChangeDetails } from '@moduix/vue/slider';
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  SliderValueText,
} from '@moduix/vue/slider';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const liveValue = ref([40]);
const committedValue = ref([40]);

const handleValueChange = (details: SliderValueChangeDetails) => {
  liveValue.value = details.value;
};

const handleValueChangeEnd = (details: SliderValueChangeDetails) => {
  committedValue.value = details.value;
};
</script>

<template>
  <Stack align="center" gap="4">
    <Slider
      :default-value="[40]"
      @value-change="handleValueChange"
      @value-change-end="handleValueChangeEnd"
    >
      <SliderLabel>Gain</SliderLabel>
      <SliderValueText />
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
    </Slider>
    <div data-preview-meta>
      <output>Live: {{ liveValue.join(', ') }} / Committed: {{ committedValue.join(', ') }}</output>
    </div>
  </Stack>
</template>