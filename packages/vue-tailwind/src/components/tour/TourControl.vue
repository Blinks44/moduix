<script setup lang="ts">
import { TourControl as ArkTourControl } from '@ark-ui/vue/tour';
import type { TourControlProps } from '@ark-ui/vue/tour';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTourControl
    v-bind="attrs"
    :class="cn('order-2 mt-3 flex flex-wrap justify-end gap-2', className)"
    data-slot="tour-control"
  >
    <slot />
  </ArkTourControl>
</template>