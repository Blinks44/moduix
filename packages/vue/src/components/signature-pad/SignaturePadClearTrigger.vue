<script setup lang="ts">
import { SignaturePadClearTrigger as ArkSignaturePadClearTrigger } from '@ark-ui/vue/signature-pad';
import type { SignaturePadClearTriggerProps } from '@ark-ui/vue/signature-pad';
import { clsx } from 'clsx';
import { computed, inject, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { RotateCcwIcon } from '@/internal/icons/ui/Icons';
import CloseButton from '../close-button/CloseButton.vue';
import { signaturePadReadOnlyKey } from './context';
import styles from './SignaturePad.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SignaturePadClearTriggerProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  disabled?: boolean;
}

const {
  ariaLabel,
  ariaLabelledby,
  asChild = false,
  class: className,
  disabled = undefined,
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const readOnly = inject(
  signaturePadReadOnlyKey,
  computed(() => false),
);
const clearTriggerProps = computed(() => {
  const isDisabled = readOnly.value || disabled;
  return isDisabled === undefined ? {} : { disabled: isDisabled };
});
</script>

<template>
  <ArkSignaturePadClearTrigger
    v-if="asChild"
    v-bind="{ ...attrs, ...clearTriggerProps }"
    as-child
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :class="clsx(styles.clearTrigger, className)"
    data-slot="signature-pad-clear-trigger"
  >
    <slot><RotateCcwIcon aria-hidden="true" /></slot>
  </ArkSignaturePadClearTrigger>
  <ArkSignaturePadClearTrigger
    v-else
    v-bind="{ ...attrs, ...clearTriggerProps }"
    as-child
    :class="clsx(styles.clearTrigger, className)"
    data-slot="signature-pad-clear-trigger"
  >
    <CloseButton :aria-label="ariaLabel" :aria-labelledby="ariaLabelledby">
      <slot><RotateCcwIcon aria-hidden="true" /></slot>
    </CloseButton>
  </ArkSignaturePadClearTrigger>
</template>