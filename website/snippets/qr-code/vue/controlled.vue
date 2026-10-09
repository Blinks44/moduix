<script setup lang="ts">
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/vue/qr-code';
import { ref } from 'vue';

const destinations = [
  { label: 'ark-ui.com', value: 'https://ark-ui.com' },
  { label: 'moduix.dev', value: 'https://moduix.dev' },
];
const value = ref(destinations[0].value);
</script>

<template>
  <QrCode v-model="value">
    <QrCodeFrame>
      <QrCodePattern />
    </QrCodeFrame>
  </QrCode>
  <output>Encoded URL: {{ value }}</output>
  <button
    v-for="destination in destinations"
    :key="destination.value"
    type="button"
    @click="value = destination.value"
  >
    {{ destination.label }}
  </button>
</template>