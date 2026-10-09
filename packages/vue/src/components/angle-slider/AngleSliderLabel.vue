<script setup lang="ts">
import { AngleSliderLabel as ArkAngleSliderLabel } from '@ark-ui/vue/angle-slider';
import type { AngleSliderLabelProps } from '@ark-ui/vue/angle-slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './AngleSlider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAngleSliderLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="angle-slider-label"
  >
    <slot />
  </ArkAngleSliderLabel>
</template>