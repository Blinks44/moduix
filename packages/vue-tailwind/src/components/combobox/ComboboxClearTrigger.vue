<script setup lang="ts">
import { ComboboxClearTrigger as ArkComboboxClearTrigger } from '@ark-ui/vue/combobox';
import type { ComboboxClearTriggerProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxClearTriggerProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, ariaLabelledby, asChild, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const triggerClass =
  'absolute inset-y-0 end-2 my-auto size-control-xs group-has-[>[data-slot=combobox-trigger]]/combobox-control:end-[2.125rem]';
</script>

<template>
  <ArkComboboxClearTrigger
    v-if="asChild"
    v-bind="attrs"
    as-child
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :class="cn(triggerClass, className)"
    data-slot="combobox-clear-trigger"
  >
    <slot />
  </ArkComboboxClearTrigger>
  <ArkComboboxClearTrigger
    v-else
    v-bind="attrs"
    as-child
    :class="cn(triggerClass, className)"
    data-slot="combobox-clear-trigger"
  >
    <CloseButton
      :aria-label="ariaLabel ?? (ariaLabelledby == null ? a11yLabels.clearSelection : undefined)"
      :aria-labelledby="ariaLabelledby"
    >
      <slot />
    </CloseButton>
  </ArkComboboxClearTrigger>
</template>