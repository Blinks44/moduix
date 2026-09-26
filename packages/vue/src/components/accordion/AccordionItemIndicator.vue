<script setup lang="ts">
import { AccordionItemIndicator as ArkAccordionItemIndicator } from '@ark-ui/vue/accordion';
import type { AccordionItemIndicatorProps } from '@ark-ui/vue/accordion';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { PlusIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Accordion.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AccordionItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAccordionItemIndicator
    v-bind="attrs"
    :class="clsx(styles.itemIndicator, className)"
    data-slot="accordion-item-indicator"
  >
    <slot><PlusIcon /></slot>
  </ArkAccordionItemIndicator>
</template>