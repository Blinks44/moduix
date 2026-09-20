<script setup lang="ts">
import { AccordionRootProvider as ArkAccordionRootProvider } from '@ark-ui/vue/accordion';
import type { AccordionRootProviderProps } from '@ark-ui/vue/accordion';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AccordionRootProviderProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs() as unknown as AccordionRootProviderProps;
const rootClass =
  'box-border flex w-full max-w-full min-w-0 flex-col text-foreground data-[orientation=horizontal]:h-80 data-[orientation=horizontal]:max-h-full data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:flex-row';
</script>

<template>
  <ArkAccordionRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    data-slot="accordion-root-provider"
  >
    <slot />
  </ArkAccordionRootProvider>
</template>