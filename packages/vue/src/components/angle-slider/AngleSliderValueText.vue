<script setup lang="ts">
import { AngleSliderValueText as ArkAngleSliderValueText } from '@ark-ui/vue/angle-slider';
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
</script>

<template>
  <ArkAngleSliderValueText
    v-bind="attrs"
    :class="clsx(styles.valueText, className)"
    data-slot="angle-slider-value-text"
  >
    <template v-if="$slots.default" #default><slot /></template>
  </ArkAngleSliderValueText>
</template>