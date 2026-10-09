<script setup lang="ts">
import { CollapsibleIndicator as ArkCollapsibleIndicator } from '@ark-ui/vue/collapsible';
import type { CollapsibleIndicatorProps } from '@ark-ui/vue/collapsible';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronDownIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Collapsible.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CollapsibleIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCollapsibleIndicator
    v-bind="attrs"
    :class="clsx(styles.indicator, className)"
    data-slot="collapsible-indicator"
  >
    <slot><ChevronDownIcon /></slot>
  </ArkCollapsibleIndicator>
</template>