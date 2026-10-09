<script setup lang="ts">
import { QrCodeFrame as ArkQrCodeFrame } from '@ark-ui/vue/qr-code';
import type { QrCodeFrameProps } from '@ark-ui/vue/qr-code';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ QrCodeFrameProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkQrCodeFrame
    v-bind="attrs"
    :class="cn('box-border aspect-square h-auto w-full fill-current text-inherit', className)"
    data-slot="qr-code-frame"
  >
    <slot />
  </ArkQrCodeFrame>
</template>