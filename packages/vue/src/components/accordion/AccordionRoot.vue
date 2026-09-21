<script setup lang="ts">
import { AccordionRoot as ArkAccordionRoot } from '@ark-ui/vue/accordion';
import type { AccordionRootEmits, AccordionRootProps } from '@ark-ui/vue/accordion';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ AccordionRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ AccordionRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkAccordionRoot v-bind="attrs" :class="clsx($style.root, className)" data-slot="accordion-root">
    <slot />
  </ArkAccordionRoot>
</template>

<style module src="./Accordion.module.css" />