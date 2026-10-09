<script setup lang="ts">
import { TooltipTrigger as ArkTooltipTrigger } from '@ark-ui/vue/tooltip';
import type { TooltipTriggerProps } from '@ark-ui/vue/tooltip';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tooltip.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TooltipTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTooltipTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.trigger, className)"
    data-slot="tooltip-trigger"
  >
    <slot />
  </ArkTooltipTrigger>
</template>