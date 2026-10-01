<script setup lang="ts">
import { ToastCloseTrigger as ArkToastCloseTrigger } from '@ark-ui/vue/toast';
import type { ToastCloseTriggerProps } from '@ark-ui/vue/toast';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './Toast.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ToastCloseTriggerProps {
  asChild?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
  class?: HTMLAttributes['class'];
}

const { asChild = false, ariaLabel, ariaLabelledby, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const resolvedAriaLabel = computed(() =>
  ariaLabel === undefined && ariaLabelledby == null ? a11yLabels.closeToast : ariaLabel,
);
</script>

<template>
  <ArkToastCloseTrigger
    v-if="asChild"
    v-bind="attrs"
    as-child
    :aria-label="resolvedAriaLabel"
    :aria-labelledby="ariaLabelledby"
    :class="className"
    data-slot="toast-close-trigger"
  >
    <slot />
  </ArkToastCloseTrigger>
  <ArkToastCloseTrigger v-else v-bind="attrs" as-child>
    <CloseButton
      :aria-label="resolvedAriaLabel"
      :aria-labelledby="ariaLabelledby"
      :class="clsx(styles.closeTrigger, className)"
      data-slot="toast-close-trigger"
    >
      <slot v-if="$slots.default" />
    </CloseButton>
  </ArkToastCloseTrigger>
</template>