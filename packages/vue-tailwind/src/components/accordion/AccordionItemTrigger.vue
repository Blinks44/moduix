<script setup lang="ts">
import { AccordionItemTrigger as ArkAccordionItemTrigger } from '@ark-ui/vue/accordion';
import type { AccordionItemTriggerProps } from '@ark-ui/vue/accordion';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AccordionItemTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const itemTriggerClass =
  'flex w-full cursor-pointer items-center justify-between gap-4 bg-transparent px-3 py-2 text-start text-md outline-0 transition-colors duration-normal select-none focus-visible:relative focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:cursor-default disabled:opacity-disabled data-[orientation=horizontal]:h-full data-[orientation=horizontal]:w-10 data-[orientation=horizontal]:justify-center data-[orientation=horizontal]:[writing-mode:sideways-lr] [&:not(:disabled):active]:bg-muted [@media(hover:hover)]:[&:not(:disabled):hover]:bg-muted';
</script>

<template>
  <ArkAccordionItemTrigger
    v-bind="attrs"
    :class="cn(itemTriggerClass, className)"
    data-slot="accordion-item-trigger"
  >
    <slot />
  </ArkAccordionItemTrigger>
</template>