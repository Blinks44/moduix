<script setup lang="ts">
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/vue/qr-code';
import styles from '@/components/examples/qr-code/component-fill.module.css';

const fills = [
  {
    label: 'Primary',
    class: styles.primary,
  },
  {
    label: 'Danger',
    class: styles.danger,
  },
];
</script>

<template>
  <div :class="styles.grid">
    <QrCode v-for="fill in fills" :key="fill.label" default-value="https://moduix.dev/docs/qr-code">
      <QrCodeFrame :class="fill.class">
        <QrCodePattern />
      </QrCodeFrame>
    </QrCode>
  </div>
</template>