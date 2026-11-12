<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/vue/qr-code';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const errorLevels = ['L', 'M', 'Q', 'H'] as const;
type ErrorLevel = (typeof errorLevels)[number];

const errorLevel = ref<ErrorLevel>('L');
</script>

<template>
  <Stack align="center" gap="3">
    <QrCode default-value="https://moduix.dev/docs/qr-code" :encoding="{ ecc: errorLevel }">
      <QrCodeFrame>
        <QrCodePattern />
      </QrCodeFrame>
    </QrCode>
    <div data-preview-meta>
      <output>Error correction: {{ errorLevel }}</output>
      <Button
        v-for="level in errorLevels"
        :key="level"
        size="sm"
        :variant="level === errorLevel ? 'default' : 'outline'"
        @click="errorLevel = level"
      >
        {{ level }}
      </Button>
    </div>
  </Stack>
</template>