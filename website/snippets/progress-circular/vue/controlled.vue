<script setup lang="ts">
import {
  ProgressCircular,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/vue/progress-circular';
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
import styles from '@/components/examples/progress-circular/component-controlled.module.css';

const value = ref<number | null>(42);
</script>

<template>
  <div :class="styles.stack">
    <ProgressCircular v-model="value">
      <ProgressCircularLabel>Upload status</ProgressCircularLabel>
      <div :class="styles.circleContainer">
        <ProgressCircularRing aria-label="Upload status" />
        <ProgressCircularValueText />
      </div>
    </ProgressCircular>
    <div>
      <output>Progress: {{ value ?? 'loading' }}%</output>
      <Slider
        :class="styles.slider"
        :value="[value ?? 0]"
        :min="0"
        :max="100"
        @value-change="value = $event.value[0] ?? 0"
      >
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
    </div>
  </div>
</template>