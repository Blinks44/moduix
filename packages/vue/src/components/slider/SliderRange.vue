<script setup lang="ts">
import { SliderRange as ArkSliderRange } from '@ark-ui/vue/slider';
import type { SliderRangeProps } from '@ark-ui/vue/slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Slider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderRangeProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderRange v-bind="attrs" :class="clsx(styles.range, className)" data-slot="slider-range">
    <slot />
  </ArkSliderRange>
</template>