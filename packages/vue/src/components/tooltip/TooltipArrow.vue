<script setup lang="ts">
import { TooltipArrow as ArkTooltipArrow } from '@ark-ui/vue/tooltip';
import type { TooltipArrowProps } from '@ark-ui/vue/tooltip';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tooltip.module.css';
import TooltipArrowTip from './TooltipArrowTip.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TooltipArrowProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTooltipArrow v-bind="attrs" :class="clsx(styles.arrow, className)" data-slot="tooltip-arrow">
    <slot v-if="$slots.default" />
    <TooltipArrowTip v-else />
  </ArkTooltipArrow>
</template>