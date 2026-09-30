<script setup lang="ts">
import { QrCodeRootProvider as ArkQrCodeRootProvider } from '@ark-ui/vue/qr-code';
import type { QrCodeRootProviderProps } from '@ark-ui/vue/qr-code';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './QrCode.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ QrCodeRootProviderProps {
  class?: HTMLAttributes['class'];
  value: QrCodeRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkQrCodeRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="qr-code-root-provider"
  >
    <slot />
  </ArkQrCodeRootProvider>
</template>