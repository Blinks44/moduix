<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/vue/tooltip';
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <div>
    <Tooltip v-model:open="open">
      <TooltipTrigger>Controlled tooltip</TooltipTrigger>
      <TooltipBody>Open: {{ open }}</TooltipBody>
    </Tooltip>
    <output>Open: {{ open }}</output>
    <Button size="sm" variant="outline" @click="open = !open">Toggle</Button>
  </div>
</template>