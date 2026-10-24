<script setup lang="ts">
import {
  AngleSliderValueText as ArkAngleSliderValueText,
  useAngleSliderContext,
} from '@ark-ui/vue/angle-slider';
import type { AngleSliderValueTextProps } from '@ark-ui/vue/angle-slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './AngleSlider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderValueTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const angleSlider = useAngleSliderContext();
</script>

<template>
  <ArkAngleSliderValueText
    v-bind="attrs"
    :class="clsx(styles.valueText, className)"
    data-slot="angle-slider-value-text"
  >
    <slot>{{ angleSlider.value }}°</slot>
  </ArkAngleSliderValueText>
</template>