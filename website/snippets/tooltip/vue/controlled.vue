<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Tooltip, TooltipPanel, TooltipTrigger } from '@moduix/vue/tooltip';
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <div>
    <Tooltip v-model:open="open">
      <TooltipTrigger>Controlled tooltip</TooltipTrigger>
      <TooltipPanel>Open: {{ open }}</TooltipPanel>
    </Tooltip>
    <div data-preview-meta>
      <output>Open: {{ open }}</output>
      <Button size="sm" variant="outline" @click="open = !open">Toggle</Button>
    </div>
  </div>
</template>