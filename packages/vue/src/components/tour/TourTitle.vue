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
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourTitle v-bind="attrs" :class="clsx(styles.title, className)" data-slot="tour-title">
    <template v-if="slots.default" #default>
      <slot />
    </template>
  </ArkTourTitle>
</template>