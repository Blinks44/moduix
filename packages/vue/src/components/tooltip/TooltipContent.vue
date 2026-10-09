<script setup lang="ts">
import { TooltipContent as ArkTooltipContent } from '@ark-ui/vue/tooltip';
import type { TooltipContentProps } from '@ark-ui/vue/tooltip';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tooltip.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TooltipContentProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTooltipContent
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(styles.content, className)"
    data-slot="tooltip-content"
  >
    <slot />
  </ArkTooltipContent>
</template>