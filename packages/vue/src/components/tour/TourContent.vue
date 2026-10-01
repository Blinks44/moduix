<script setup lang="ts">
import { TourContent as ArkTourContent } from '@ark-ui/vue/tour';
import type { TourContentProps } from '@ark-ui/vue/tour';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tour.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourContent v-bind="attrs" :class="clsx(styles.content, className)" data-slot="tour-content">
    <slot />
  </ArkTourContent>
</template>