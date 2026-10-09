<script setup lang="ts">
import { TooltipTrigger as ArkTooltipTrigger } from '@ark-ui/vue/tooltip';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Tooltip.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class'];
  tabindex?: HTMLAttributes['tabindex'];
}

const { class: className, tabindex = 0 } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <ArkTooltipTrigger :ref="forwardRef" as-child>
    <span
      v-bind="attrs"
      :tabindex="tabindex"
      :class="clsx(styles.disabledTrigger, className)"
      data-slot="tooltip-disabled-trigger"
    >
      <slot />
    </span>
  </ArkTooltipTrigger>
</template>