<script setup lang="ts">
import { TourTitle as ArkTourTitle } from '@ark-ui/vue/tour';
import type { TourTitleProps } from '@ark-ui/vue/tour';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourTitleProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourTitle
    v-if="!$slots.default"
    v-bind="attrs"
    :class="cn('pe-6 text-md leading-6 font-semibold text-popover-foreground', className)"
    data-slot="tour-title"
  />
  <ArkTourTitle
    v-else
    v-bind="attrs"
    :class="cn('pe-6 text-md leading-6 font-semibold text-popover-foreground', className)"
    data-slot="tour-title"
  >
    <slot />
  </ArkTourTitle>
</template>