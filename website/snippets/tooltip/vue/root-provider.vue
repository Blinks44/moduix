<script setup lang="ts">
import { useTooltip, TooltipBody, TooltipRootProvider, TooltipTrigger } from '@moduix/vue/tooltip';

const tooltip = useTooltip();
</script>

<template>
  <TooltipRootProvider :value="tooltip">
    <TooltipTrigger>RootProvider tooltip</TooltipTrigger>
    <TooltipBody>State is owned outside the tree.</TooltipBody>
  </TooltipRootProvider>
  <output>Open: {{ tooltip.open }}</output>
</template>