<script setup lang="ts">
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/vue/qr-code';
import { ref } from 'vue';

const errorLevels = ['L', 'M', 'Q', 'H'] as const;
type ErrorLevel = (typeof errorLevels)[number];

const errorLevel = ref<ErrorLevel>('L');
</script>

<template>
  <QrCode default-value="https://moduix.dev/docs/qr-code" :encoding="{ ecc: errorLevel }">
    <QrCodeFrame>
      <QrCodePattern />
    </QrCodeFrame>
  </QrCode>
  <div data-preview-meta>
    <output>Error correction: {{ errorLevel }}</output>
  </div>
  <button
    v-for="level in errorLevels"
    :key="level"
    type="button"
    :aria-pressed="level === errorLevel"
    @click="errorLevel = level"
  >
    {{ level }}
  </button>
</template>