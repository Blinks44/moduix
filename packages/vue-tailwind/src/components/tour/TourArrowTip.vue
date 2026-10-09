<script setup lang="ts">
import { TourArrowTip as ArkTourArrowTip } from '@ark-ui/vue/tour';
import type { TourArrowTipProps } from '@ark-ui/vue/tour';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourArrowTipProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourArrowTip
    v-bind="attrs"
    :class="cn('border-t border-l border-border !bg-popover', className)"
    data-slot="tour-arrow-tip"
  >
    <slot />
  </ArkTourArrowTip>
</template>