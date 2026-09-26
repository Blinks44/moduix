<script setup lang="ts">
import { DialogPositioner as ArkDialogPositioner } from '@ark-ui/vue/dialog';
import type { DialogPositionerProps } from '@ark-ui/vue/dialog';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ DialogPositionerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkDialogPositioner
      :ref="forwardRef"
      v-bind="attrs"
      :class="
        cn(
          'fixed inset-0 z-[calc(50+var(--layer-index,0))] grid items-start justify-items-center overflow-hidden overscroll-contain px-4 pt-[10dvh] pb-4',
          className,
        )
      "
      data-slot="command-palette-positioner"
    >
      <slot />
    </ArkDialogPositioner>
  </OverlayPortal>
</template>