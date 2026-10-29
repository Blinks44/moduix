<script setup lang="ts">
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/vue/qr-code';

const fills = [
  { label: 'Primary', color: 'var(--moduix-primary)' },
  { label: 'Danger', color: 'var(--moduix-destructive)' },
];
</script>

<template>
  <QrCode v-for="fill in fills" :key="fill.label" default-value="https://moduix.dev/docs/qr-code">
    <QrCodeFrame :style="{ color: fill.color }" role="img" :aria-label="`${fill.label} QR code`">
      <QrCodePattern />
    </QrCodeFrame>
  </QrCode>
</template>