<script setup lang="ts">
import { AccordionItemIndicator as ArkAccordionItemIndicator } from '@ark-ui/vue/accordion';
import type { AccordionItemIndicatorProps } from '@ark-ui/vue/accordion';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AccordionItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const itemIndicatorClass =
  'inline-flex size-3 shrink-0 items-center justify-center transition-transform duration-normal data-[state=open]:rotate-180 [&_svg]:size-full';
</script>

<template>
  <ArkAccordionItemIndicator
    v-bind="attrs"
    :class="cn(itemIndicatorClass, className)"
    data-slot="accordion-item-indicator"
  >
    <slot><ChevronDownIcon /></slot>
  </ArkAccordionItemIndicator>
</template>