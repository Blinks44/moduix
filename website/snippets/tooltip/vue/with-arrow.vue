<script setup lang="ts">
import { Tooltip, TooltipArrow, TooltipPanel, TooltipTrigger } from '@moduix/vue/tooltip';
</script>

<template>
  <Tooltip>
    <TooltipTrigger>Hover or focus</TooltipTrigger>
    <TooltipPanel>
      <TooltipArrow />
      Tooltip with arrow
    </TooltipPanel>
  </Tooltip>
</template>