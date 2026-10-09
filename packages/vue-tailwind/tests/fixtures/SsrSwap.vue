<script setup lang="ts">
import { Swap, SwapIndicator } from '../../src/components/swap';
</script>

<template>
  <Swap swap
    ><SwapIndicator type="off">Off</SwapIndicator><SwapIndicator type="on">On</SwapIndicator></Swap
  >
</template>