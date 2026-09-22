<script setup lang="ts">
import { AccordionItemTrigger as ArkAccordionItemTrigger } from '@ark-ui/vue/accordion';
import type { AccordionItemTriggerProps } from '@ark-ui/vue/accordion';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Accordion.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AccordionItemTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAccordionItemTrigger
    v-bind="attrs"
    :class="clsx(styles.itemTrigger, className)"
    data-slot="accordion-item-trigger"
  >
    <slot />
  </ArkAccordionItemTrigger>
</template>