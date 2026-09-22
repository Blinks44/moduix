<script setup lang="ts">
import { AccordionItemContent as ArkAccordionItemContent } from '@ark-ui/vue/accordion';
import type { AccordionItemContentProps } from '@ark-ui/vue/accordion';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Accordion.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AccordionItemContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAccordionItemContent
    v-bind="attrs"
    :class="clsx(styles.itemContent, className)"
    data-slot="accordion-item-content"
  >
    <slot />
  </ArkAccordionItemContent>
</template>