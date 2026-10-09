<script setup lang="ts">
import { QrCodeOverlay as ArkQrCodeOverlay } from '@ark-ui/vue/qr-code';
import type { QrCodeOverlayProps } from '@ark-ui/vue/qr-code';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './QrCode.module.css';

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
    :class="clsx(styles.overlay, className)"
    data-slot="qr-code-overlay"
  >
    <slot />
  </ArkQrCodeOverlay>
</template>