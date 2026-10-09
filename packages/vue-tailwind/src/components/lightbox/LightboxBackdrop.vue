<script setup lang="ts">
import { DialogBackdrop as ArkDialogBackdrop } from '@ark-ui/vue/dialog';
import type { DialogBackdropProps } from '@ark-ui/vue/dialog';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '@/lib/moduix/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DialogBackdropProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const { forwardRef } = useForwardExpose();
</script>

<template>
  <OverlayPortal>
    <ArkDialogBackdrop
      :ref="forwardRef"
      v-bind="attrs"
      :class="
        cn(
          'fixed inset-0 z-[calc(var(--z-index,var(--moduix-z-popup))-1)] min-h-dvh bg-overlay backdrop-blur-xs data-[state=closed]:animate-moduix-lightbox-backdrop-out data-[state=open]:animate-moduix-lightbox-backdrop-in motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
          className,
        )
      "
      data-slot="lightbox-backdrop"
    >
      <slot />
    </ArkDialogBackdrop>
  </OverlayPortal>
</template>