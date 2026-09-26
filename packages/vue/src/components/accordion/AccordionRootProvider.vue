<script setup lang="ts">
import { AccordionRootProvider as ArkAccordionRootProvider } from '@ark-ui/vue/accordion';
import type { AccordionRootProviderProps } from '@ark-ui/vue/accordion';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Accordion.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AccordionRootProviderProps {
  class?: HTMLAttributes['class'];
  value: AccordionRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAccordionRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="accordion-root-provider"
  >
    <slot />
  </ArkAccordionRootProvider>
</template>