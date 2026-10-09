<script setup lang="ts">
import { TooltipArrowTip as ArkTooltipArrowTip } from '@ark-ui/vue/tooltip';
import type { TooltipArrowTipProps } from '@ark-ui/vue/tooltip';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TooltipArrowTipProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkTooltipArrowTip
    v-bind="attrs"
    :class="cn('border-t border-l border-border', className)"
    data-slot="tooltip-arrow-tip"
  >
    <slot />
  </ArkTooltipArrowTip>
</template>