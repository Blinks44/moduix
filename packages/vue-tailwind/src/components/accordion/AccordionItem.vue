<script setup lang="ts">
import { AccordionItem as ArkAccordionItem } from '@ark-ui/vue/accordion';
import type { AccordionItemProps } from '@ark-ui/vue/accordion';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AccordionItemProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs() as unknown as AccordionItemProps;
const itemClass =
  "[overflow-anchor:none] data-[orientation=horizontal]:flex [&[data-orientation='horizontal']:not(:last-child)]:border-e [&[data-orientation='horizontal']:not(:last-child)]:border-border [&[data-orientation='vertical']:not(:last-child)]:border-b [&[data-orientation='vertical']:not(:last-child)]:border-border";
</script>

<template>
  <ArkAccordionItem v-bind="attrs" :class="cn(itemClass, className)" data-slot="accordion-item">
    <slot />
  </ArkAccordionItem>
</template>