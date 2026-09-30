<script setup lang="ts">
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/vue/qr-code';
import { ref } from 'vue';

const value = ref('https://moduix.dev/docs/qr-code');
</script>

<template>
  <input v-model="value" aria-label="QR code content" />
  <QrCode v-model="value">
    <QrCodeFrame role="img" aria-label="QR code for the entered content">
      <QrCodePattern />
    </QrCodeFrame>
  </QrCode>
  <output>Encoded content: {{ value || 'empty' }}</output>
</template>