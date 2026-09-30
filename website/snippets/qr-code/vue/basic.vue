<script setup lang="ts">
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/vue/qr-code';
</script>

<template>
  <QrCode default-value="https://moduix.dev/docs/qr-code">
    <QrCodeFrame role="img" aria-label="QR code for moduix QR Code documentation">
      <QrCodePattern />
    </QrCodeFrame>
  </QrCode>
</template>