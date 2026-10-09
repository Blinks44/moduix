<script setup lang="ts">
import { SliderHiddenInput, useSliderContext } from '@ark-ui/vue/slider';
import type { HTMLAttributes } from 'vue';
import SliderThumb from './SliderThumb.vue';

defineOptions({ inheritAttrs: false });

export interface Props {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const slider = useSliderContext();
</script>

<template>
  <SliderThumb v-for="(_, index) in slider.value" :key="index" :class="className" :index="index">
    <SliderHiddenInput />
  </SliderThumb>
</template>