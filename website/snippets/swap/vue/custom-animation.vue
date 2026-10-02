<script setup lang="ts">
import { Check as CheckIcon, Download as DownloadIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { Swap, SwapIndicator } from '@moduix/vue/swap';
import { ref } from 'vue';
import styles from '@/components/examples/swap/swap-custom-animation.module.css';

const downloaded = ref(false);
</script>

<template>
  <Button :aria-label="downloaded ? 'Downloaded' : 'Download'" @click="downloaded = !downloaded">
    <Swap animation="bounce" :class="styles.root" :swap="downloaded">
      <SwapIndicator aria-hidden="true" type="off"><DownloadIcon /></SwapIndicator>
      <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
    </Swap>
  </Button>
</template>