<script setup lang="ts">
import { QrCode, QrCodeFrame, QrCodeOverlay, QrCodePattern } from '@moduix/vue/qr-code';
</script>

<template>
  <QrCode default-value="https://moduix.dev/docs/qr-code" :encoding="{ ecc: 'H' }">
    <QrCodeFrame>
      <QrCodePattern />
    </QrCodeFrame>
    <QrCodeOverlay>MX</QrCodeOverlay>
  </QrCode>
</template>