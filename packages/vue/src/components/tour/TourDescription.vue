<script setup lang="ts">
import { TourDescription as ArkTourDescription } from '@ark-ui/vue/tour';
import type { TourDescriptionProps } from '@ark-ui/vue/tour';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tour.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourDescriptionProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourDescription
    v-bind="attrs"
    :class="clsx(styles.description, className)"
    data-slot="tour-description"
  >
    <template v-if="slots.default" #default>
      <slot />
    </template>
  </ArkTourDescription>
</template>