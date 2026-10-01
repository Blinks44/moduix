<script setup lang="ts">
import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/vue/tooltip';
</script>

<template>
  <Tooltip :close-delay="0" :open-delay="0">
    <TooltipTrigger>Immediate tooltip</TooltipTrigger>
    <TooltipBody>No open or close delay</TooltipBody>
  </Tooltip>
</template>