<script setup lang="ts">
import { SliderThumb as ArkSliderThumb } from '@ark-ui/vue/slider';
import type { SliderThumbProps } from '@ark-ui/vue/slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Slider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderThumbProps {
  class?: HTMLAttributes['class'];
  index: SliderThumbProps['index'];
}

const { class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderThumb
    v-bind="attrs"
    :class="clsx(styles.thumb, className)"
    :index="index"
    data-slot="slider-thumb"
  >
    <slot />
  </ArkSliderThumb>
</template>