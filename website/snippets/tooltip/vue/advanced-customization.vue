<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '@moduix/vue/tooltip';
</script>

<template>
  <Tooltip :positioning="{ placement: 'right', offset: { mainAxis: 12 } }">
    <TooltipTrigger as-child><Button>Hover or focus</Button></TooltipTrigger>
    <TooltipPositioner>
      <TooltipContent>Explicit positioner and content.</TooltipContent>
    </TooltipPositioner>
  </Tooltip>
</template>