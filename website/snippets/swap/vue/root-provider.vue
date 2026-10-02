<script setup lang="ts">
import { Check as CheckIcon, Download as DownloadIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { SwapIndicator, SwapRootProvider, useSwap } from '@moduix/vue/swap';
import { computed, ref } from 'vue';
import styles from '@/components/examples/swap/swap-root-provider.module.css';

const downloaded = ref(false);
const swap = useSwap(computed(() => ({ swap: downloaded.value })));
</script>

<template>
  <div :class="styles.root">
    <SwapRootProvider :value="swap" as-child>
      <Button
        :aria-label="downloaded ? 'Downloaded' : 'Download'"
        @click="downloaded = !downloaded"
      >
        <SwapIndicator aria-hidden="true" type="off"><DownloadIcon /></SwapIndicator>
        <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
      </Button>
    </SwapRootProvider>
    <output>Visible indicator: {{ downloaded ? 'Downloaded' : 'Download' }}</output>
  </div>
</template>