<script setup lang="ts">
import { TourBackdrop as ArkTourBackdrop } from '@ark-ui/vue/tour';
import type { TourBackdropProps } from '@ark-ui/vue/tour';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TourBackdropProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkTourBackdrop
      :ref="forwardRef"
      v-bind="attrs"
      :class="
        cn(
          'z-[calc(var(--moduix-z-tour)+var(--tour-layer,0))] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-moduix-dialog-backdrop-out data-[state=open]:animate-moduix-dialog-backdrop-in motion-reduce:data-[state]:animate-none',
          className,
        )
      "
      data-slot="tour-backdrop"
    >
      <slot />
    </ArkTourBackdrop>
  </OverlayPortal>
</template>