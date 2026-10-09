<script setup lang="ts">
import { SliderControl as ArkSliderControl } from '@ark-ui/vue/slider';
import type { SliderControlProps } from '@ark-ui/vue/slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Slider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderControl
    v-bind="attrs"
    :class="clsx(styles.control, className)"
    data-slot="slider-control"
  >
    <slot />
  </ArkSliderControl>
</template>