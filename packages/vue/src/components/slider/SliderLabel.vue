<script setup lang="ts">
import { SliderLabel as ArkSliderLabel } from '@ark-ui/vue/slider';
import type { SliderLabelProps } from '@ark-ui/vue/slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Slider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderLabel v-bind="attrs" :class="clsx(styles.label, className)" data-slot="slider-label">
    <slot />
  </ArkSliderLabel>
</template>