<script setup lang="ts">
import { SliderMarkerGroup as ArkSliderMarkerGroup } from '@ark-ui/vue/slider';
import type { SliderMarkerGroupProps } from '@ark-ui/vue/slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Slider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SliderMarkerGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSliderMarkerGroup
    v-bind="attrs"
    :class="clsx(styles.markerGroup, className)"
    data-slot="slider-marker-group"
  >
    <slot />
  </ArkSliderMarkerGroup>
</template>