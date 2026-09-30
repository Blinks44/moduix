<script setup lang="ts">
import { SliderValueText as ArkSliderValueText } from '@ark-ui/vue/slider';
import type { SliderValueTextProps } from '@ark-ui/vue/slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Slider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderValueText
    v-bind="attrs"
    :class="clsx(styles.valueText, className)"
    data-slot="slider-value-text"
  >
    <template v-if="$slots.default" #default><slot /></template>
  </ArkSliderValueText>
</template>