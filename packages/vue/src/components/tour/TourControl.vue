<script setup lang="ts">
import { TourControl as ArkTourControl } from '@ark-ui/vue/tour';
import type { TourControlProps } from '@ark-ui/vue/tour';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tour.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourControl v-bind="attrs" :class="clsx(styles.control, className)" data-slot="tour-control">
    <slot />
  </ArkTourControl>
</template>