<script setup lang="ts">
import { QrCodeRoot as ArkQrCodeRoot } from '@ark-ui/vue/qr-code';
import type { QrCodeRootEmits, QrCodeRootProps } from '@ark-ui/vue/qr-code';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ QrCodeRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ QrCodeRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkQrCodeRoot
    v-bind="attrs"
    :class="cn('inline-grid w-32 max-w-full grid-cols-1 justify-items-center gap-3', className)"
    data-slot="qr-code-root"
  >
    <slot />
  </ArkQrCodeRoot>
</template>