<script setup lang="ts">
import type { AngleSliderMarkerGroupProps } from '@ark-ui/vue/angle-slider';
import { useAttrs } from 'vue';
import AngleSliderMarker from './AngleSliderMarker.vue';
import AngleSliderMarkerGroup from './AngleSliderMarkerGroup.vue';

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ Omit<AngleSliderMarkerGroupProps, 'asChild' | 'children'> {
  values: readonly number[];
}

const { values } = defineProps<Props>();

const attrs = useAttrs();
</script>

<template>
  <AngleSliderMarkerGroup v-bind="attrs">
    <AngleSliderMarker v-for="(value, index) in values" :key="`${value}-${index}`" :value="value" />
  </AngleSliderMarkerGroup>
</template>