<script setup lang="ts">
import {
  QrCodeContext,
  QrCodeFrame,
  QrCodePattern,
  QrCodeRootProvider,
  useQrCode,
} from '@moduix/vue/qr-code';

const qrCode = useQrCode({
  value: 'https://moduix.dev/docs/qr-code',
});
</script>

<template>
  <QrCodeRootProvider :value="qrCode">
    <QrCodeFrame>
      <QrCodePattern />
    </QrCodeFrame>
    <QrCodeContext v-slot="context">
      <output>Encoded URL: {{ context.value }}</output>
    </QrCodeContext>
  </QrCodeRootProvider>
</template>