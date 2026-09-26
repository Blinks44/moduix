<script setup lang="ts">
import { AngleSliderThumb as ArkAngleSliderThumb } from '@ark-ui/vue/angle-slider';
import type { AngleSliderThumbProps } from '@ark-ui/vue/angle-slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './AngleSlider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderThumbProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAngleSliderThumb
    v-bind="attrs"
    :class="clsx(styles.thumb, className)"
    data-slot="angle-slider-thumb"
  >
    <slot />
  </ArkAngleSliderThumb>
</template>