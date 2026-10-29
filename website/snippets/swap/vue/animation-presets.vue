<script setup lang="ts">
import { Check as CheckIcon, Download as DownloadIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { Stack } from '@moduix/vue/stack';
import { Swap, SwapIndicator, type SwapAnimation } from '@moduix/vue/swap';
import { ref } from 'vue';

const animations = ['fade', 'scale', 'rotate', 'flip'] as const;
const animation = ref<SwapAnimation>('scale');
const downloaded = ref(false);
</script>

<template>
  <Stack align="center" gap="4">
    <Button :aria-label="downloaded ? 'Downloaded' : 'Download'" @click="downloaded = !downloaded">
      <Swap :animation="animation" :swap="downloaded">
        <SwapIndicator aria-hidden="true" type="off"><DownloadIcon /></SwapIndicator>
        <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
      </Swap>
    </Button>
    <Stack align="center" gap="2">
      <output>Animation: {{ animation }}</output>
      <Stack direction="row" justify="center" wrap="wrap" gap="0.5rem">
        <Button
          v-for="name in animations"
          :key="name"
          :aria-pressed="animation === name"
          size="sm"
          :variant="animation === name ? 'default' : 'outline'"
          @click="animation = name"
        >
          {{ name }}
        </Button>
      </Stack>
    </Stack>
  </Stack>
</template>