<script setup lang="ts">
import { TooltipPositioner as ArkTooltipPositioner } from '@ark-ui/vue/tooltip';
import type { TooltipPositionerProps } from '@ark-ui/vue/tooltip';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';
import styles from './Tooltip.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TooltipPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkTooltipPositioner
      :ref="forwardRef"
      v-bind="attrs"
      :class="clsx(styles.positioner, className)"
      data-slot="tooltip-positioner"
    >
      <slot />
    </ArkTooltipPositioner>
  </OverlayPortal>
</template>