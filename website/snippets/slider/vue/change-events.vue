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
import { ref } from 'vue';
import styles from '@/components/examples/slider/slider-change-events.module.css';

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
  <div :class="styles.stack">
    <Slider
      :default-value="[40]"
      @value-change="handleValueChange"
      @value-change-end="handleValueChangeEnd"
    >
      <div :class="styles.header">
        <SliderLabel>Gain</SliderLabel>
        <SliderValueText />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumbs />
      </SliderControl>
    </Slider>
    <output>Live: {{ liveValue.join(', ') }} / Committed: {{ committedValue.join(', ') }}</output>
  </div>
</template>