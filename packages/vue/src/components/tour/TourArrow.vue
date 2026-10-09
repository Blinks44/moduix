<script setup lang="ts">
import { TourArrow as ArkTourArrow } from '@ark-ui/vue/tour';
import type { TourArrowProps } from '@ark-ui/vue/tour';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tour.module.css';
import TourArrowTip from './TourArrowTip.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourArrowProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourArrow v-bind="attrs" :class="clsx(styles.arrow, className)" data-slot="tour-arrow">
    <TourArrowTip v-if="!slots.default" />
    <slot v-else />
  </ArkTourArrow>
</template>