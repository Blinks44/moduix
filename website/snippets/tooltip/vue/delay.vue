<script setup lang="ts">
import { Tooltip, TooltipPanel, TooltipTrigger } from '@moduix/vue/tooltip';
</script>

<template>
  <Tooltip :close-delay="0" :open-delay="0">
    <TooltipTrigger>Immediate tooltip</TooltipTrigger>
    <TooltipPanel>No open or close delay</TooltipPanel>
  </Tooltip>
</template>