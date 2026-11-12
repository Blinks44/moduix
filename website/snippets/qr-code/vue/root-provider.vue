<script setup lang="ts">
import { QrCodeFrame, QrCodePattern, QrCodeRootProvider, useQrCode } from '@moduix/vue/qr-code';
import { Stack } from '@moduix/vue/stack';

const qrCode = useQrCode({
  value: 'https://moduix.dev/docs/qr-code',
});
</script>

<template>
  <Stack align="center" gap="3">
    <QrCodeRootProvider :value="qrCode">
      <QrCodeFrame>
        <QrCodePattern />
      </QrCodeFrame>
    </QrCodeRootProvider>
    <div data-preview-meta>
      <output>Encoded URL: {{ qrCode.value }}</output>
    </div>
  </Stack>
</template>