<script setup lang="ts">
import { ComboboxItemIndicator as ArkComboboxItemIndicator } from '@ark-ui/vue/combobox';
import type { ComboboxItemIndicatorProps } from '@ark-ui/vue/combobox';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ComboboxItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkComboboxItemIndicator
    v-bind="attrs"
    :class="
      cn('inline-flex size-3 shrink-0 items-center justify-center [&>svg]:size-full', className)
    "
    data-slot="combobox-item-indicator"
  >
    <slot><CheckIcon /></slot>
  </ArkComboboxItemIndicator>
</template>