<script setup lang="ts">
import { QrCodeOverlay as ArkQrCodeOverlay } from '@ark-ui/vue/qr-code';
import type { QrCodeOverlayProps } from '@ark-ui/vue/qr-code';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ QrCodeOverlayProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkQrCodeOverlay
    v-bind="attrs"
    :class="
      cn(
        'inline-flex aspect-square w-1/3 items-center justify-center rounded-sm bg-background p-1 text-foreground [grid-area:1/1/2/2] [&_img]:size-full [&_img]:object-contain [&_svg]:size-full [&_svg]:object-contain',
        className,
      )
    "
    data-slot="qr-code-overlay"
  >
    <slot />
  </ArkQrCodeOverlay>
</template>