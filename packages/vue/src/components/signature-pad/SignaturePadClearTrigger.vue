<script setup lang="ts">
import { SignaturePadClearTrigger as ArkSignaturePadClearTrigger } from '@ark-ui/vue/signature-pad';
import type { SignaturePadClearTriggerProps } from '@ark-ui/vue/signature-pad';
import { clsx } from 'clsx';
import { computed, inject, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { RotateCcwIcon } from '@/lib/moduix/icons/ui';
import CloseButton from '../close-button/CloseButton.vue';
import { signaturePadReadOnlyKey } from './context';
import styles from './SignaturePad.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SignaturePadClearTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  disabled?: boolean;
}

const { asChild = false, class: className, disabled = undefined } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const readOnly = inject(
  signaturePadReadOnlyKey,
  computed(() => false),
);
// Vue mergeProps lets undefined win, so only pass state that is set.
const stateProps = computed(() => ({
  ...(disabled === undefined ? {} : { disabled }),
  ...(readOnly.value ? { hidden: true } : {}),
}));
</script>

<!-- Ark still clears read-only signatures, so moduix hides the action as it does while empty. -->
<template>
  <ArkSignaturePadClearTrigger
    v-bind="{ ...attrs, ...stateProps }"
    as-child
    :class="clsx(styles.clearTrigger, className)"
    data-slot="signature-pad-clear-trigger"
  >
    <slot v-if="asChild" />
    <CloseButton v-else>
      <slot><RotateCcwIcon aria-hidden="true" /></slot>
    </CloseButton>
  </ArkSignaturePadClearTrigger>
</template>