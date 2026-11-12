<script setup lang="ts">
import { QrCode, QrCodeFrame, QrCodeOverlay, QrCodePattern } from '@moduix/vue/qr-code';
import styles from '@/components/examples/qr-code/component-overlay.module.css';
</script>

<template>
  <QrCode default-value="https://moduix.dev/docs/qr-code" :encoding="{ ecc: 'H' }">
    <QrCodeFrame :class="styles.frame">
      <QrCodePattern />
    </QrCodeFrame>
    <QrCodeOverlay :class="styles.overlay">MX</QrCodeOverlay>
  </QrCode>
</template>