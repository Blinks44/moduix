<script setup lang="ts">
import { PopoverPositioner as ArkPopoverPositioner } from '@ark-ui/vue/popover';
import type { PopoverPositionerProps } from '@ark-ui/vue/popover';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '../../internal/cn';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PopoverPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkPopoverPositioner
      :ref="forwardRef"
      v-bind="attrs"
      :class="
        cn(
          'z-[var(--z-index,var(--moduix-z-popup))] max-w-[var(--available-width)] outline-0',
          className,
        )
      "
      data-slot="popover-positioner"
    >
      <slot />
    </ArkPopoverPositioner>
  </OverlayPortal>
</template>