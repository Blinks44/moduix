<script setup lang="ts">
import { TourCloseTrigger as ArkTourCloseTrigger } from '@ark-ui/vue/tour';
import type { TourCloseTriggerProps } from '@ark-ui/vue/tour';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ TourCloseTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkTourCloseTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="className"
    data-slot="tour-close-trigger"
  >
    <slot />
  </ArkTourCloseTrigger>
</template>