<script setup lang="ts">
import { Tooltip, TooltipPositioner, TooltipTrigger } from '@moduix/vue/tooltip';
import TooltipStateContent from './TooltipStateContent.vue';
</script>

<template>
  <Tooltip>
    <TooltipTrigger>Context tooltip</TooltipTrigger>
    <TooltipPositioner><TooltipStateContent /></TooltipPositioner>
  </Tooltip>
</template>