<script setup lang="ts">
import { QrCodeRoot as ArkQrCodeRoot } from '@ark-ui/vue/qr-code';
import type { QrCodeRootEmits, QrCodeRootProps } from '@ark-ui/vue/qr-code';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './QrCode.module.css';

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
  <ArkQrCodeRoot v-bind="attrs" :class="clsx(styles.root, className)" data-slot="qr-code-root">
    <slot />
  </ArkQrCodeRoot>
</template>