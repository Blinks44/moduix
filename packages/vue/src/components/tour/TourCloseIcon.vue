<script setup lang="ts">
import { TourCloseTrigger as ArkTourCloseTrigger } from '@ark-ui/vue/tour';
import type { TourCloseTriggerProps } from '@ark-ui/vue/tour';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './Tour.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<TourCloseTriggerProps, 'asChild'> {
  class?: HTMLAttributes['class'];
  ariaLabel?: HTMLAttributes['aria-label'];
}

const { class: className, ariaLabel } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourCloseTrigger v-bind="attrs" as-child>
    <CloseButton
      :aria-label="ariaLabel ?? a11yLabels.closeTour"
      :class="clsx(styles.closeIcon, className)"
      data-slot="tour-close-icon"
    >
      <template v-if="$slots.default" #default>
        <slot />
      </template>
    </CloseButton>
  </ArkTourCloseTrigger>
</template>