<script setup lang="ts">
import { TourTitle as ArkTourTitle } from '@ark-ui/vue/tour';
import type { TourTitleProps } from '@ark-ui/vue/tour';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tour.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourTitle
    v-if="!$slots.default"
    v-bind="attrs"
    :class="clsx(styles.title, className)"
    data-slot="tour-title"
  />
  <ArkTourTitle v-else v-bind="attrs" :class="clsx(styles.title, className)" data-slot="tour-title">
    <slot />
  </ArkTourTitle>
</template>