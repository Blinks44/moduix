<script setup lang="ts">
import { DialogBackdrop as ArkDialogBackdrop } from '@ark-ui/vue/dialog';
import type { DialogBackdropProps } from '@ark-ui/vue/dialog';
import { useForwardExpose } from '@ark-ui/vue/utils';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import OverlayPortal from '../../internal/overlayPortal/OverlayPortal.vue';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ DialogBackdropProps {
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
          'fixed inset-0 z-[calc(40+var(--layer-index,0))] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-[moduix-fade-out_200ms_ease-in-out_forwards] data-[state=open]:animate-[moduix-fade-in_200ms_ease-in-out] motion-reduce:animate-none',
          className,
        )
      "
      data-slot="dialog-backdrop"
    >
      <slot />
    </ArkDialogBackdrop>
  </OverlayPortal>
</template>