<script setup lang="ts">
import { TourActionTrigger as ArkTourActionTrigger } from '@ark-ui/vue/tour';
import type { TourActionTriggerProps } from '@ark-ui/vue/tour';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tour.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourActionTriggerProps {
  action: TourActionTriggerProps['action'];
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { action, asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourActionTrigger
    v-bind="attrs"
    :action="action"
    :as-child="asChild"
    :class="clsx(!asChild && styles.actionTrigger, className)"
    data-slot="tour-action-trigger"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </ArkTourActionTrigger>
</template>