<script setup lang="ts">
import { QrCodeFrame, QrCodePattern, QrCodeRootProvider, useQrCode } from '@moduix/vue/qr-code';

const qrCode = useQrCode({
  value: 'https://moduix.dev/docs/qr-code',
});
</script>

<template>
  <QrCodeRootProvider :value="qrCode">
    <QrCodeFrame>
      <QrCodePattern />
    </QrCodeFrame>
  </QrCodeRootProvider>
  <output>Encoded URL: {{ qrCode.value }}</output>
</template>