<script setup lang="ts">
import { SelectItemIndicator as ArkSelectItemIndicator } from '@ark-ui/vue/select';
import type { SelectItemIndicatorProps } from '@ark-ui/vue/select';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectItemIndicator
    v-bind="attrs"
    :class="
      cn('inline-flex size-3.5 shrink-0 items-center justify-center [&>svg]:size-3', className)
    "
    data-slot="select-item-indicator"
  >
    <slot><CheckIcon /></slot>
  </ArkSelectItemIndicator>
</template>