<script setup lang="ts">
import { SliderDraggingIndicator as ArkSliderDraggingIndicator } from '@ark-ui/vue/slider';
import type { SliderDraggingIndicatorProps } from '@ark-ui/vue/slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Slider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderDraggingIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderDraggingIndicator
    v-bind="attrs"
    :class="clsx(styles.draggingIndicator, className)"
    data-slot="slider-dragging-indicator"
  >
    <template v-if="$slots.default" #default><slot /></template>
  </ArkSliderDraggingIndicator>
</template>