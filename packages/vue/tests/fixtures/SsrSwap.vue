<script setup lang="ts">
import { Swap, SwapIndicator } from '@/components/swap';
</script>

<template>
  <Swap swap
    ><SwapIndicator type="off">Off</SwapIndicator><SwapIndicator type="on">On</SwapIndicator></Swap
  >
</template>