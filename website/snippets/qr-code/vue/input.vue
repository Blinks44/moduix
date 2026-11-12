<script setup lang="ts">
import { Input } from '@moduix/vue/input';
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/vue/qr-code';
import { ref } from 'vue';
import styles from '@/components/examples/qr-code/component-input.module.css';

const value = ref('https://moduix.dev/docs/qr-code');
</script>

<template>
  <div :class="styles.stack">
    <Input v-model="value" aria-label="QR code content" :class="styles.input" />
    <QrCode v-model="value">
      <QrCodeFrame role="img" aria-label="QR code for the entered content">
        <QrCodePattern />
      </QrCodeFrame>
    </QrCode>
    <div data-preview-meta>
      <output>Encoded content: {{ value || 'empty' }}</output>
    </div>
  </div>
</template>