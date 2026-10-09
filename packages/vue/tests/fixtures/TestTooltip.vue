<script setup lang="ts">
import { Tooltip, TooltipArrow, TooltipBody, TooltipTrigger } from '../../src/components/tooltip';
</script>

<template>
  <Tooltip default-open :portalled="false">
    <TooltipTrigger>Inline save</TooltipTrigger>
    <TooltipBody><TooltipArrow />Inline hint</TooltipBody>
  </Tooltip>
  <Tooltip default-open>
    <TooltipTrigger>Portalled save</TooltipTrigger>
    <TooltipBody><TooltipArrow />Portalled hint</TooltipBody>
  </Tooltip>
  <Tooltip :open-delay="0">
    <TooltipTrigger>Closed save</TooltipTrigger>
    <TooltipBody>Closed hint</TooltipBody>
  </Tooltip>
</template>