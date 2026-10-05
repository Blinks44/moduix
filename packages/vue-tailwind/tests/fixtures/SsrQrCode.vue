<script setup lang="ts">
import { QrCode, QrCodeFrame, QrCodePattern, QrCodeOverlay } from '../../src/components/qr-code';
</script>

<template>
  <QrCode default-value="https://moduix.dev/docs/qr-code"
    ><QrCodeFrame role="img" aria-label="Hydrated QR code"><QrCodePattern /></QrCodeFrame
    ><QrCodeOverlay>MX</QrCodeOverlay></QrCode
  >
</template>