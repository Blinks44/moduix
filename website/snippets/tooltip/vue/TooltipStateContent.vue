<script setup lang="ts">
import { TooltipContent, useTooltipContext } from '@moduix/vue/tooltip';
import { computed } from 'vue';
const tooltip = useTooltipContext();
const open = computed(() => tooltip.value.open.toString());
</script>

<template>
  <TooltipContent>Open from context: {{ open }}</TooltipContent>
</template>