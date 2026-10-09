<script setup lang="ts">
import { TourProgressText as ArkTourProgressText } from '@ark-ui/vue/tour';
import type { TourProgressTextProps } from '@ark-ui/vue/tour';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourProgressTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourProgressText
    v-bind="attrs"
    :class="cn('order-1 mt-2 text-xs leading-4 text-muted-foreground', className)"
    data-slot="tour-progress-text"
  >
    <template v-if="slots.default" #default>
      <slot />
    </template>
  </ArkTourProgressText>
</template>