<script setup lang="ts">
import { TourArrow as ArkTourArrow } from '@ark-ui/vue/tour';
import type { TourArrowProps } from '@ark-ui/vue/tour';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import TourArrowTip from './TourArrowTip.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourArrowProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourArrow
    v-bind="attrs"
    :class="
      cn('[--arrow-background:var(--color-popover)] [--arrow-size:var(--spacing-2_5)]', className)
    "
    data-slot="tour-arrow"
  >
    <TourArrowTip v-if="!slots.default" />
    <slot v-else />
  </ArkTourArrow>
</template>