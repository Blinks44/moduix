<script setup lang="ts">
import { TooltipPositioner as ArkTooltipPositioner } from '@ark-ui/vue/tooltip';
import type { TooltipPositionerProps } from '@ark-ui/vue/tooltip';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';

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
      :class="
        cn(
          'z-[var(--z-index,var(--moduix-z-popup))] max-h-[var(--available-height)] max-w-[var(--available-width)] outline-0',
          className,
        )
      "
      data-slot="tooltip-positioner"
    >
      <slot />
    </ArkTooltipPositioner>
  </OverlayPortal>
</template>