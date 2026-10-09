<script setup lang="ts">
import { AccordionItem as ArkAccordionItem } from '@ark-ui/vue/accordion';
import type { AccordionItemProps } from '@ark-ui/vue/accordion';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Accordion.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AccordionItemProps {
  class?: HTMLAttributes['class'];
  value: AccordionItemProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAccordionItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :value="value"
    data-slot="accordion-item"
  >
    <slot />
  </ArkAccordionItem>
</template>