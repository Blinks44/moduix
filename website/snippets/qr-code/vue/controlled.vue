<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { QrCode, QrCodeFrame, QrCodePattern } from '@moduix/vue/qr-code';
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const destinations = ['https://ark-ui.com', 'https://moduix.dev'];
const value = ref(destinations[0]);
const hostname = (url: string) => new URL(url).hostname;
</script>

<template>
  <Stack align="center" gap="3">
    <QrCode v-model="value">
      <QrCodeFrame>
        <QrCodePattern />
      </QrCodeFrame>
    </QrCode>
    <div data-preview-meta>
      <output>Encoded URL: {{ value }}</output>
      <Button
        v-for="destination in destinations"
        :key="destination"
        size="sm"
        variant="outline"
        @click="value = destination"
      >
        {{ hostname(destination) }}
      </Button>
    </div>
  </Stack>
</template>