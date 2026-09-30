<script setup lang="ts">
import { SliderMarker as ArkSliderMarker } from '@ark-ui/vue/slider';
import type { SliderMarkerProps } from '@ark-ui/vue/slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Slider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderMarkerProps {
  class?: HTMLAttributes['class'];
  value: SliderMarkerProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderMarker
    v-bind="attrs"
    :class="clsx(styles.marker, className)"
    :value="value"
    data-slot="slider-marker"
  >
    <slot />
  </ArkSliderMarker>
</template>