<script setup lang="ts">
import { HoverCardPositioner as ArkHoverCardPositioner } from '@ark-ui/vue/hover-card';
import type { HoverCardPositionerProps } from '@ark-ui/vue/hover-card';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HoverCardPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkHoverCardPositioner
      :ref="forwardRef"
      v-bind="attrs"
      :class="
        cn(
          'z-[var(--z-index,var(--moduix-z-popup))] max-w-[var(--available-width)] outline-0',
          className,
        )
      "
      data-slot="hover-card-positioner"
    >
      <slot />
    </ArkHoverCardPositioner>
  </OverlayPortal>
</template>