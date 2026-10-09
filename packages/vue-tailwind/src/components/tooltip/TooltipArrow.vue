<script setup lang="ts">
import { TooltipArrow as ArkTooltipArrow } from '@ark-ui/vue/tooltip';
import type { TooltipArrowProps } from '@ark-ui/vue/tooltip';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
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
  <ArkTooltipArrow
    v-bind="attrs"
    :class="
      cn('[--arrow-background:var(--color-popover)] [--arrow-size:var(--spacing-2_5)]', className)
    "
    data-slot="tooltip-arrow"
  >
    <slot v-if="$slots.default" />
    <TooltipArrowTip v-else />
  </ArkTooltipArrow>
</template>