<script setup lang="ts">
import type { TooltipContentProps } from '@ark-ui/vue/tooltip';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import TooltipContent from './TooltipContent.vue';
import TooltipPositioner from './TooltipPositioner.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TooltipContentProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <TooltipPositioner>
    <TooltipContent :ref="forwardRef" v-bind="attrs" :as-child="asChild" :class="className">
      <slot />
    </TooltipContent>
  </TooltipPositioner>
</template>