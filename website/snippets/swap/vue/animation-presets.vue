<script setup lang="ts">
import { Check as CheckIcon, Download as DownloadIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { Swap, SwapIndicator, type SwapAnimation } from '@moduix/vue/swap';
import { ref } from 'vue';
import styles from '@/components/examples/swap/swap-animation-presets.module.css';

const animations = ['fade', 'scale', 'rotate', 'flip'] as const;
const animation = ref<SwapAnimation>('scale');
const downloaded = ref(false);
</script>

<template>
  <div :class="styles.root">
    <Button :aria-label="downloaded ? 'Downloaded' : 'Download'" @click="downloaded = !downloaded">
      <Swap :animation="animation" :swap="downloaded">
        <SwapIndicator aria-hidden="true" type="off"><DownloadIcon /></SwapIndicator>
        <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
      </Swap>
    </Button>
    <div :class="styles.controls">
      <output>Animation: {{ animation }}</output>
      <div :class="styles.buttons">
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
      </div>
    </div>
  </div>
</template>