<script setup lang="ts">
import { SelectClearTrigger as ArkSelectClearTrigger } from '@ark-ui/vue/select';
import type { SelectClearTriggerProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectClearTriggerProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, ariaLabelledby, asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const clearClass = 'absolute inset-y-0 end-[2.125rem] my-auto size-control-xs';
</script>

<template>
  <ArkSelectClearTrigger
    v-if="asChild"
    v-bind="attrs"
    as-child
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :class="cn(clearClass, className)"
    data-slot="select-clear-trigger"
  >
    <slot />
  </ArkSelectClearTrigger>
  <ArkSelectClearTrigger
    v-else
    v-bind="attrs"
    as-child
    :class="cn(clearClass, className)"
    data-slot="select-clear-trigger"
  >
    <CloseButton
      :aria-label="ariaLabel ?? (ariaLabelledby == null ? a11yLabels.clearSelection : undefined)"
      :aria-labelledby="ariaLabelledby"
    >
      <slot />
    </CloseButton>
  </ArkSelectClearTrigger>
</template>