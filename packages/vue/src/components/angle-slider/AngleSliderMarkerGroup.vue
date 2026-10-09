<script setup lang="ts">
import { AngleSliderMarkerGroup as ArkAngleSliderMarkerGroup } from '@ark-ui/vue/angle-slider';
import type { AngleSliderMarkerGroupProps } from '@ark-ui/vue/angle-slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './AngleSlider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderMarkerGroupProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAngleSliderMarkerGroup
    v-bind="attrs"
    :class="clsx(styles.markerGroup, className)"
    data-slot="angle-slider-marker-group"
  >
    <slot />
  </ArkAngleSliderMarkerGroup>
</template>