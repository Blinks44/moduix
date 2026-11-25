<script setup lang="ts">
import { useTooltip, TooltipPanel, TooltipRootProvider, TooltipTrigger } from '@moduix/vue/tooltip';

const tooltip = useTooltip();
</script>

<template>
  <TooltipRootProvider :value="tooltip">
    <TooltipTrigger>RootProvider tooltip</TooltipTrigger>
    <TooltipPanel>State is owned outside the tree.</TooltipPanel>
  </TooltipRootProvider>
  <div data-preview-meta>
    <output>Open: {{ tooltip.open }}</output>
  </div>
</template>