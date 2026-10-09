<script setup lang="ts">
import { Tooltip, TooltipArrow, TooltipBody, TooltipTrigger } from '@moduix/vue/tooltip';
</script>

<template>
  <Tooltip>
    <TooltipTrigger>Hover or focus</TooltipTrigger>
    <TooltipBody>
      <TooltipArrow />
      Tooltip with arrow
    </TooltipBody>
  </Tooltip>
</template>