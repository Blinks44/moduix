<script setup lang="ts">
import { AngleSliderMarker as ArkAngleSliderMarker } from '@ark-ui/vue/angle-slider';
import type { AngleSliderMarkerProps } from '@ark-ui/vue/angle-slider';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './AngleSlider.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AngleSliderMarkerProps {
  class?: HTMLAttributes['class'];
  value: AngleSliderMarkerProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAngleSliderMarker
    v-bind="attrs"
    :class="clsx(styles.marker, className)"
    :value="value"
    data-slot="angle-slider-marker"
  >
    <slot />
  </ArkAngleSliderMarker>
</template>