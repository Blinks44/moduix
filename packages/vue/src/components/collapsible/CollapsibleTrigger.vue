<script setup lang="ts">
import { CollapsibleTrigger as ArkCollapsibleTrigger } from '@ark-ui/vue/collapsible';
import type { CollapsibleTriggerProps } from '@ark-ui/vue/collapsible';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Collapsible.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CollapsibleTriggerProps {
  asChild?: CollapsibleTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCollapsibleTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.trigger, className)"
    data-slot="collapsible-trigger"
  >
    <slot />
  </ArkCollapsibleTrigger>
</template>