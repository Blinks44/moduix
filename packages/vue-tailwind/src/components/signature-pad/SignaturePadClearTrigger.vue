<script setup lang="ts">
import { SignaturePadClearTrigger as ArkSignaturePadClearTrigger } from '@ark-ui/vue/signature-pad';
import type { SignaturePadClearTriggerProps } from '@ark-ui/vue/signature-pad';
import { computed, inject, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { RotateCcwIcon } from '@/lib/moduix/icons/ui';
import CloseButton from '../close-button/CloseButton.vue';
import { signaturePadReadOnlyKey } from './context';

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
    :class="cn('absolute end-2 top-2 border-0', className)"
    data-slot="signature-pad-clear-trigger"
  >
    <slot><RotateCcwIcon class="size-4" aria-hidden="true" /></slot>
  </ArkSignaturePadClearTrigger>
  <ArkSignaturePadClearTrigger
    v-else
    v-bind="{ ...attrs, ...clearTriggerProps }"
    as-child
    :class="
      cn(
        `absolute end-2 top-2 size-control-xs rounded-sm border-0 bg-transparent text-muted-foreground focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-foreground`,
        className,
      )
    "
    data-slot="signature-pad-clear-trigger"
  >
    <CloseButton :aria-label="ariaLabel" :aria-labelledby="ariaLabelledby">
      <slot><RotateCcwIcon class="size-4" aria-hidden="true" /></slot>
    </CloseButton>
  </ArkSignaturePadClearTrigger>
</template>