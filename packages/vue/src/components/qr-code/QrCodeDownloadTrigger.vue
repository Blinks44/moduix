<script setup lang="ts">
import { QrCodeDownloadTrigger as ArkQrCodeDownloadTrigger } from '@ark-ui/vue/qr-code';
import type { QrCodeDownloadTriggerProps } from '@ark-ui/vue/qr-code';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './QrCode.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ QrCodeDownloadTriggerProps {
  class?: HTMLAttributes['class'];
  fileName: QrCodeDownloadTriggerProps['fileName'];
  mimeType: QrCodeDownloadTriggerProps['mimeType'];
}

const { class: className, fileName, mimeType } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkQrCodeDownloadTrigger
    v-bind="attrs"
    :class="clsx(styles.downloadTrigger, className)"
    :file-name="fileName"
    :mime-type="mimeType"
    data-slot="qr-code-download-trigger"
  >
    <slot />
  </ArkQrCodeDownloadTrigger>
</template>