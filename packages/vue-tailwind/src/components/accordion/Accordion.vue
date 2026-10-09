<script setup lang="ts">
import { AccordionRoot as ArkAccordionRoot } from '@ark-ui/vue/accordion';
import type { AccordionRootEmits, AccordionRootProps } from '@ark-ui/vue/accordion';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AccordionRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ AccordionRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootClass =
  'box-border flex w-full max-w-full min-w-0 flex-col text-foreground data-[orientation=horizontal]:h-80 data-[orientation=horizontal]:max-h-full data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:flex-row';
</script>

<template>
  <ArkAccordionRoot v-bind="attrs" :class="cn(rootClass, className)" data-slot="accordion-root">
    <slot />
  </ArkAccordionRoot>
</template>