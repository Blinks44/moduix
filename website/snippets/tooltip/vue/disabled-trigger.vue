<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import { Tooltip, TooltipPanel, TooltipDisabledTrigger } from '@moduix/vue/tooltip';
</script>

<template>
  <Tooltip>
    <TooltipDisabledTrigger aria-label="Create project is unavailable">
      <Button disabled>Create project</Button>
    </TooltipDisabledTrigger>
    <TooltipPanel>Projects are unavailable while offline.</TooltipPanel>
  </Tooltip>
</template>