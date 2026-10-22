<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from '@ark-ui/vue/tooltip';
import { computed, useAttrs } from 'vue';
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '../tooltip';
import type { Props as TooltipProps } from '../tooltip/Tooltip.vue';
import { useSidebar } from './context';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<TooltipProps, 'disabled' | 'positioning'> {
  closeDelay?: TooltipRootProps['closeDelay'];
  content?: string | number;
  openDelay?: TooltipRootProps['openDelay'];
  positioning?: TooltipRootProps['positioning'];
}

export interface Emits extends /* @vue-ignore */ TooltipRootEmits {}

const {
  closeDelay = 0,
  content,
  openDelay = 200,
  positioning: positioningProp,
} = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown; content?: () => unknown }>();

const attrs = useAttrs();
const { collapsed, side } = useSidebar();

const positioning = computed<TooltipRootProps['positioning']>(() => ({
  placement: side.value === 'left' ? 'right' : 'left',
  gutter: 8,
  ...positioningProp,
}));
</script>

<template>
  <Tooltip
    v-bind="attrs"
    :close-delay="closeDelay"
    :open-delay="openDelay"
    :disabled="!collapsed"
    :positioning="positioning"
  >
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>
    <TooltipPositioner>
      <TooltipContent>
        <slot name="content">{{ content }}</slot>
      </TooltipContent>
    </TooltipPositioner>
  </Tooltip>
</template>