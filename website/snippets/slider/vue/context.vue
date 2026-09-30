<script setup lang="ts">
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumbs,
  SliderTrack,
  useSliderContext,
} from '@moduix/vue/slider';
import { defineComponent } from 'vue';

const SliderStatus = defineComponent({
  components: { SliderLabel },
  setup() {
    return { slider: useSliderContext() };
  },
  template:
    "<SliderLabel>Value: {{ slider.value.join(', ') }} · Dragging: {{ String(slider.dragging) }}</SliderLabel>",
});
</script>

<template>
  <Slider :default-value="[40]">
    <SliderStatus />
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumbs />
    </SliderControl>
  </Slider>
</template>