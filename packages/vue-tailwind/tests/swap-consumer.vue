<script setup lang="ts">
import { computed, ref } from 'vue';
import { Swap, SwapIndicator, SwapRootProvider, useSwap } from '../src/components/swap';

const swapped = ref(false);
const swap = useSwap(computed(() => ({ swap: swapped.value })));
</script>

<template>
  <SwapRootProvider :value="swap">
    <SwapIndicator type="off">Off</SwapIndicator>
    <SwapIndicator type="on">On</SwapIndicator>
  </SwapRootProvider>
  <Swap :swap="swapped">
    <SwapIndicator type="off">Off</SwapIndicator>
    <SwapIndicator type="on">On</SwapIndicator>
  </Swap>
</template>