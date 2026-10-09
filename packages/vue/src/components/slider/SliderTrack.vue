<script setup lang="ts">
import { SliderTrack as ArkSliderTrack } from '@ark-ui/vue/slider';
import type { SliderTrackProps } from '@ark-ui/vue/slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Slider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderTrackProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderTrack v-bind="attrs" :class="clsx(styles.track, className)" data-slot="slider-track">
    <slot />
  </ArkSliderTrack>
</template>