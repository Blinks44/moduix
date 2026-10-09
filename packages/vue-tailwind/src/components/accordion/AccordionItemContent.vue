<script setup lang="ts">
import { AccordionItemContent as ArkAccordionItemContent } from '@ark-ui/vue/accordion';
import type { AccordionItemContentProps } from '@ark-ui/vue/accordion';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AccordionItemContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const itemContentClass =
  "overflow-hidden text-md text-muted-foreground data-[state=closed]:data-[orientation=horizontal]:animate-moduix-accordion-closed-horizontal data-[state=closed]:data-[orientation=vertical]:animate-moduix-accordion-closed data-[state=open]:data-[orientation=horizontal]:animate-moduix-accordion-open-horizontal data-[state=open]:data-[orientation=vertical]:animate-moduix-accordion-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms] data-[orientation=horizontal]:[&>*]:w-64 [&[hidden]:not([hidden='until-found'])]:hidden";
</script>

<template>
  <ArkAccordionItemContent
    v-bind="attrs"
    :class="cn(itemContentClass, className)"
    data-slot="accordion-item-content"
  >
    <slot />
  </ArkAccordionItemContent>
</template>